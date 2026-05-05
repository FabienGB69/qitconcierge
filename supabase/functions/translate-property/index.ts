import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { propertyId, targetLanguage } = await req.json();

    if (!propertyId || !targetLanguage) {
      return new Response(
        JSON.stringify({ error: "propertyId and targetLanguage are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const lang = String(targetLanguage).toLowerCase();
    if (!["en", "fr"].includes(lang)) {
      return new Response(
        JSON.stringify({ error: "Unsupported language" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cache check
    const { data: cached } = await supabase
      .from("property_translations")
      .select("title, description")
      .eq("property_id", propertyId)
      .eq("language", lang)
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify(cached), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch property
    const { data: property, error: propErr } = await supabase
      .from("properties")
      .select("title, description")
      .eq("id", propertyId)
      .single();

    if (propErr || !property) {
      return new Response(JSON.stringify({ error: "Property not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Translate via Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const targetName = lang === "en" ? "English" : "French";
    const sourceName = lang === "en" ? "French" : "English";

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a professional translator for short-term rental listings. Translate from ${sourceName} to ${targetName}. Keep a sober, neutral tone. Never use words like "premium" or "luxury". Preserve meaning and proper nouns.`,
            },
            {
              role: "user",
              content: `Translate the title and description to ${targetName}.\n\nTitle: ${property.title}\n\nDescription: ${property.description ?? ""}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_translation",
                description: "Return the translated title and description.",
                parameters: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["title", "description"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "return_translation" },
          },
        }),
      },
    );

    if (!aiResp.ok) {
      if (aiResp.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await aiResp.text();
      console.error("AI error", aiResp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiResp.json();
    const argsStr =
      aiData.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!argsStr) {
      console.error("No tool call in response", JSON.stringify(aiData));
      return new Response(JSON.stringify({ error: "Invalid AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const parsed = JSON.parse(argsStr);

    const translation = {
      title: parsed.title as string,
      description: (parsed.description as string) ?? null,
    };

    // Cache it (ignore conflict)
    await supabase.from("property_translations").upsert(
      {
        property_id: propertyId,
        language: lang,
        title: translation.title,
        description: translation.description,
      },
      { onConflict: "property_id,language" },
    );

    return new Response(JSON.stringify(translation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-property error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
