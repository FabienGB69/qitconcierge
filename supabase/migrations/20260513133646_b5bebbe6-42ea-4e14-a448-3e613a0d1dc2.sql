CREATE TABLE public.estimation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  property_type TEXT,
  surface TEXT,
  beds TEXT,
  online_status TEXT,
  platform TEXT,
  listing_url TEXT,
  goal TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'form',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.estimation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an estimation request"
ON public.estimation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view estimation requests"
ON public.estimation_requests
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update estimation requests"
ON public.estimation_requests
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete estimation requests"
ON public.estimation_requests
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_estimation_requests_updated_at
BEFORE UPDATE ON public.estimation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_estimation_requests_created_at ON public.estimation_requests(created_at DESC);
CREATE INDEX idx_estimation_requests_status ON public.estimation_requests(status);