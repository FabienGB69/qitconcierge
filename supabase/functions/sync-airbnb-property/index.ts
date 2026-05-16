import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Extract Airbnb room ID from a URL, embed snippet, or raw ID.
function extractAirbnbId(input: string): string | null {
  const trimmed = input.trim();
  if (/^\d{6,}$/.test(trimmed)) return trimmed;
  const dataId = trimmed.match(/data-id=["'](\d+)["']/i);
  if (dataId) return dataId[1];
  const roomUrl = trimmed.match(/airbnb\.[a-z.]+\/rooms\/(?:plus\/)?(\d+)/i);
  if (roomUrl) return roomUrl[1];
  const anyDigits = trimmed.match(/(\d{8,})/);
  return anyDigits ? anyDigits[1] : null;
}

// Try to scrape title + rating from the public Airbnb listing page.
async function fetchAirbnbMeta(airbnbId: string): Promise<{
  title: string | null;
  rating: number | null;
  image: string | null;
  url: string;
}> {
  const url = `https://www.airbnb.fr/rooms/${airbnbId}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
    },
  });
  if (!res.ok) {
    console.warn("Airbnb fetch failed", res.status);
    return { title: null, rating: null, image: null, url };
  }
  const html = await res.text();

  // og:title typically contains the listing name.
  let title: string | null = null;
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
  if (ogTitle) title = ogTitle[1].replace(/&amp;/g, "&").replace(/&#39;/g, "'").trim();
  if (!title) {
    const t = html.match(/<title>([^<]+)<\/title>/i);
    if (t) title = t[1].replace(/\s*[-|·].*$/, "").trim();
  }

  // og:image for a real photo.
  let image: string | null = null;
  const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (ogImg) image = ogImg[1];

  // Rating: aggregateRating in JSON-LD, or any "x,yz" near "étoile" / "star".
  let rating: number | null = null;
  const agg = html.match(/"ratingValue"\s*:\s*"?(\d(?:[.,]\d{1,2})?)"?/);
  if (agg) rating = parseFloat(agg[1].replace(",", "."));
  if (rating === null) {
    const star = html.match(/★\s*(\d(?:[.,]\d{1,2}))/);
    if (star) rating = parseFloat(star[1].replace(",", "."));
  }
  if (rating !== null && (isNaN(rating) || rating < 0 || rating > 5)) rating = null;

  return { title, rating, image, url };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "") ?? "";
    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Verify admin role
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) return json({ error: "Forbidden" }, 403);

    const body = await req.json().catch(() => ({}));
    const { input, propertyId, persist } = body as {
      input?: string;
      propertyId?: string;
      persist?: boolean;
    };

    let source = input ?? "";
    if (!source && propertyId) {
      const { data: p } = await admin
        .from("properties")
        .select("airbnb_id, airbnb_url")
        .eq("id", propertyId)
        .single();
      source = p?.airbnb_id || p?.airbnb_url || "";
    }

    const airbnbId = extractAirbnbId(source);
    if (!airbnbId) return json({ error: "Identifiant Airbnb introuvable" }, 400);

    const meta = await fetchAirbnbMeta(airbnbId);
    const result = {
      airbnb_id: airbnbId,
      airbnb_url: meta.url,
      title: meta.title,
      airbnb_rating: meta.rating,
      image_url: meta.image,
      airbnb_synced_at: new Date().toISOString(),
    };

    if (persist && propertyId) {
      const updates: Record<string, unknown> = {
        airbnb_id: airbnbId,
        airbnb_url: meta.url,
        airbnb_synced_at: result.airbnb_synced_at,
      };
      if (meta.title) updates.title = meta.title;
      if (meta.rating !== null) updates.airbnb_rating = meta.rating;
      if (meta.image) updates.image_url = meta.image;
      const { error: upErr } = await admin
        .from("properties")
        .update(updates)
        .eq("id", propertyId);
      if (upErr) return json({ error: upErr.message }, 500);
    }

    return json(result);
  } catch (e) {
    console.error("sync-airbnb-property error", e);
    return json({ error: "Internal error" }, 500);
  }
});
