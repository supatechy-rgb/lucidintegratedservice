-- Change default value of is_approved to true for automatic approval
ALTER TABLE public.testimonials ALTER COLUMN is_approved SET DEFAULT true;