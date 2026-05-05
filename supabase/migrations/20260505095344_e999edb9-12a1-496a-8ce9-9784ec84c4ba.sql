
CREATE TABLE public.property_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (property_id, language)
);

CREATE INDEX idx_property_translations_lookup ON public.property_translations(property_id, language);

ALTER TABLE public.property_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read translations"
ON public.property_translations FOR SELECT
USING (true);

CREATE TRIGGER update_property_translations_updated_at
BEFORE UPDATE ON public.property_translations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
