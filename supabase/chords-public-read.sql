-- Run this in Supabase SQL Editor if Buku Ende Chords should be visible publicly.
-- Existing song entries are not deleted; old member-only read policies can hide them.

drop policy if exists "songs_members_read" on public.songs;
drop policy if exists "songs_public_read" on public.songs;
drop policy if exists "song_images_members_read" on public.song_images;
drop policy if exists "song_images_public_read" on public.song_images;

create policy "songs_public_read" on public.songs
  for select using (true);

create policy "song_images_public_read" on public.song_images
  for select using (true);
