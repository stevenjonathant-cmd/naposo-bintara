-- Run once if your database already has the original songs table.
-- Adds metadata needed for chord search and future transposition.

alter table public.songs
  add column if not exists original_key text,
  add column if not exists chord_text text;
