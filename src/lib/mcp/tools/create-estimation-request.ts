import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "create_estimation_request",
  title: "Create estimation request",
  description: "Create a new free-estimation lead for Qit Concierge (owner asking for a revenue estimation of their short-term rental).",
  inputSchema: {
    name: z.string().min(1).max(120),
    email: z.string().email(),
    phone: z.string().min(3).max(40),
    city: z.string().max(120).optional(),
    property_type: z.string().max(60).optional(),
    beds: z.string().max(20).optional(),
    surface: z.string().max(20).optional(),
    platform: z.string().max(60).optional(),
    online_status: z.string().max(60).optional(),
    listing_url: z.string().url().max(500).optional(),
    goal: z.string().max(500).optional(),
    message: z.string().max(2000).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("estimation_requests")
      .insert({ ...input, source: "mcp" })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Estimation request created: ${data.id}` }],
      structuredContent: { request: data },
    };
  },
});
