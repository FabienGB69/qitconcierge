
-- 1. Move has_role to a private schema not exposed by the API
CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
-- Note: schema 'private' is not exposed in the API, so it's not directly callable via REST/GraphQL

-- 2. Recreate all policies that referenced public.has_role to use private.has_role
-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- properties
DROP POLICY IF EXISTS "Admins can delete properties" ON public.properties;
CREATE POLICY "Admins can delete properties" ON public.properties
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can insert properties" ON public.properties;
CREATE POLICY "Admins can insert properties" ON public.properties
  FOR INSERT TO authenticated
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update properties" ON public.properties;
CREATE POLICY "Admins can update properties" ON public.properties
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view all properties" ON public.properties;
CREATE POLICY "Admins can view all properties" ON public.properties
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- estimation_requests
DROP POLICY IF EXISTS "Admins can delete estimation requests" ON public.estimation_requests;
CREATE POLICY "Admins can delete estimation requests" ON public.estimation_requests
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update estimation requests" ON public.estimation_requests;
CREATE POLICY "Admins can update estimation requests" ON public.estimation_requests
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can view estimation requests" ON public.estimation_requests;
CREATE POLICY "Admins can view estimation requests" ON public.estimation_requests
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Replace the "WITH CHECK (true)" policy on estimation_requests with validated checks
DROP POLICY IF EXISTS "Anyone can submit an estimation request" ON public.estimation_requests;
CREATE POLICY "Anyone can submit an estimation request" ON public.estimation_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(btrim(name)) BETWEEN 1 AND 200
    AND length(btrim(email)) BETWEEN 3 AND 320
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(phone)) BETWEEN 3 AND 50
    AND (message IS NULL OR length(message) <= 5000)
    AND (city IS NULL OR length(city) <= 200)
    AND (listing_url IS NULL OR length(listing_url) <= 1000)
    AND status = 'new'
    AND source IN ('form', 'estimator', 'whatsapp', 'contact')
  );

-- Drop the old public.has_role function (no longer referenced)
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 3. Hide tables from the GraphQL schema (REST/PostgREST still works)
COMMENT ON TABLE public.properties IS e'@graphql({"public": false})';
COMMENT ON TABLE public.property_translations IS e'@graphql({"public": false})';
COMMENT ON TABLE public.estimation_requests IS e'@graphql({"public": false})';
COMMENT ON TABLE public.user_roles IS e'@graphql({"public": false})';
