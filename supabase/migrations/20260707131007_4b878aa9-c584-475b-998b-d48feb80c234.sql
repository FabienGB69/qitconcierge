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
    AND source IN ('form', 'estimator', 'whatsapp', 'contact', 'email')
  );