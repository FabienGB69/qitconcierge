
-- Revoke access to the pg_graphql public schema so tables are no longer discoverable via GraphQL.
-- The app uses PostgREST (REST API), not GraphQL.
REVOKE USAGE ON SCHEMA graphql_public FROM anon, authenticated;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA graphql_public FROM anon, authenticated;

-- Also remove the previous comment-based attempts so the schema is clean
COMMENT ON TABLE public.properties IS NULL;
COMMENT ON TABLE public.property_translations IS NULL;
COMMENT ON TABLE public.estimation_requests IS NULL;
COMMENT ON TABLE public.user_roles IS NULL;
