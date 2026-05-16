ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS airbnb_id text,
  ADD COLUMN IF NOT EXISTS airbnb_rating numeric(3,2),
  ADD COLUMN IF NOT EXISTS airbnb_synced_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS properties_airbnb_id_unique ON public.properties(airbnb_id) WHERE airbnb_id IS NOT NULL;