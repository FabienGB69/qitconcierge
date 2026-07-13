import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listPropertiesTool from "./tools/list-properties";
import createEstimationRequestTool from "./tools/create-estimation-request";
import listEstimationRequestsTool from "./tools/list-estimation-requests";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "qit-concierge-mcp",
  title: "Qit Concierge",
  version: "0.1.0",
  instructions:
    "Tools for Qit Concierge, a short-term rental concierge in Drôme-Ardèche. Use `list_properties` to browse managed listings, `create_estimation_request` to submit a new owner lead, and `list_estimation_requests` (admins only) to review incoming leads.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listPropertiesTool, createEstimationRequestTool, listEstimationRequestsTool],
});
