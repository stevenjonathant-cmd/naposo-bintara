-- Run this once if your database already has the original schema.
-- It creates the public storage bucket used by admin chord image uploads.

insert into storage.buckets (id, name, public)
values ('chord-images', 'chord-images', true)
on conflict (id) do update set public = true;

drop policy if exists "chord_images_storage_public_read" on storage.objects;
drop policy if exists "chord_images_storage_admin_insert" on storage.objects;
drop policy if exists "chord_images_storage_admin_update" on storage.objects;
drop policy if exists "chord_images_storage_admin_delete" on storage.objects;

create policy "chord_images_storage_public_read" on storage.objects
  for select using (bucket_id = 'chord-images');

create policy "chord_images_storage_admin_insert" on storage.objects
  for insert with check (bucket_id = 'chord-images' and public.is_admin());

create policy "chord_images_storage_admin_update" on storage.objects
  for update using (bucket_id = 'chord-images' and public.is_admin()) with check (bucket_id = 'chord-images' and public.is_admin());

create policy "chord_images_storage_admin_delete" on storage.objects
  for delete using (bucket_id = 'chord-images' and public.is_admin());
