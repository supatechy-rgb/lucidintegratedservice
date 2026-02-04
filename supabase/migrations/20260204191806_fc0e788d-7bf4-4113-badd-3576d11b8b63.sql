-- Block all UPDATE operations from public users (only service role can update)
CREATE POLICY "Only service role can update testimonials"
ON public.testimonials
FOR UPDATE
USING (false);

-- Block all DELETE operations from public users (only service role can delete)
CREATE POLICY "Only service role can delete testimonials"
ON public.testimonials
FOR DELETE
USING (false);