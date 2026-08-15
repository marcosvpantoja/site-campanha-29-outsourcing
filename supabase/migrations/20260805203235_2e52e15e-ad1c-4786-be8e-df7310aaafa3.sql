-- 1. Articles: remove public INSERT
DROP POLICY IF EXISTS "Anyone can create articles" ON public.articles;
REVOKE INSERT, UPDATE, DELETE ON public.articles FROM anon, authenticated;
CREATE POLICY "Authenticated users can create articles"
ON public.articles FOR INSERT TO authenticated WITH CHECK (true);
GRANT INSERT ON public.articles TO authenticated;

-- 2. Storage: restrict uploads to article-images to authenticated users
DROP POLICY IF EXISTS "Anyone can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "article-images public insert" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload article images" ON storage.objects;
CREATE POLICY "Authenticated can upload article images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'article-images');

-- 3. Leads: explicitly ensure no read/update/delete access for public roles
REVOKE SELECT, UPDATE, DELETE ON public.lead_qualifications FROM anon, authenticated;
GRANT INSERT ON public.lead_qualifications TO anon, authenticated;
GRANT ALL ON public.lead_qualifications TO service_role;