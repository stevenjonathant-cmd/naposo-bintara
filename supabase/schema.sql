create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  is_approved boolean not null default false,
  is_admin boolean not null default false,
  is_finance boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  service_type text not null check (service_type in ('saturday', 'youth')),
  service_date timestamptz not null,
  title text not null,
  theme text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.weekly_agenda (
  id uuid primary key default gen_random_uuid(),
  weekday text not null,
  time text not null,
  title text not null,
  description text not null default '',
  location text not null default '',
  accent text not null default 'teal' check (accent in ('teal', 'amber', 'rose', 'blue')),
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.service_assignments (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  role text not null,
  person_name text not null,
  sort_order int not null default 0
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date timestamptz not null,
  location text not null default '',
  description text not null default '',
  image_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'General',
  song_number text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.song_images (
  id uuid primary key default gen_random_uuid(),
  song_id uuid not null references public.songs(id) on delete cascade,
  image_path text not null,
  sort_order int not null default 0
);

create table if not exists public.finance_reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  month int not null check (month between 1 and 12),
  year int not null check (year between 2000 and 2100),
  notes text,
  file_url text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.weekly_agenda enable row level security;
alter table public.service_assignments enable row level security;
alter table public.events enable row level security;
alter table public.songs enable row level security;
alter table public.song_images enable row level security;
alter table public.finance_reports enable row level security;

create or replace function public.current_profile()
returns public.profiles
language sql
stable
security definer
set search_path = public
as $$
  select * from public.profiles where id = auth.uid();
$$;

create or replace function public.is_approved()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_approved from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

create or replace function public.is_finance()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select is_finance from public.profiles where id = auth.uid()), false);
$$;

create policy "profiles_read_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles_admin_update" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

create policy "services_public_read" on public.services for select using (true);
create policy "services_admin_all" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "weekly_agenda_public_read" on public.weekly_agenda for select using (true);
create policy "weekly_agenda_admin_all" on public.weekly_agenda for all using (public.is_admin()) with check (public.is_admin());
create policy "assignments_public_read" on public.service_assignments for select using (true);
create policy "assignments_admin_all" on public.service_assignments for all using (public.is_admin()) with check (public.is_admin());

create policy "events_public_published" on public.events for select using (status = 'published' or public.is_admin());
create policy "events_admin_all" on public.events for all using (public.is_admin()) with check (public.is_admin());

create policy "songs_members_read" on public.songs for select using (public.is_approved());
create policy "songs_admin_all" on public.songs for all using (public.is_admin()) with check (public.is_admin());
create policy "song_images_members_read" on public.song_images for select using (public.is_approved());
create policy "song_images_admin_all" on public.song_images for all using (public.is_admin()) with check (public.is_admin());

create policy "finance_read_finance" on public.finance_reports for select using (public.is_approved() and public.is_finance());
create policy "finance_write_finance" on public.finance_reports for all using (public.is_approved() and public.is_finance()) with check (public.is_approved() and public.is_finance());

insert into storage.buckets (id, name, public)
values ('chord-images', 'chord-images', true)
on conflict (id) do update set public = true;

create policy "chord_images_storage_public_read" on storage.objects
  for select using (bucket_id = 'chord-images');

create policy "chord_images_storage_admin_insert" on storage.objects
  for insert with check (bucket_id = 'chord-images' and public.is_admin());

create policy "chord_images_storage_admin_update" on storage.objects
  for update using (bucket_id = 'chord-images' and public.is_admin()) with check (bucket_id = 'chord-images' and public.is_admin());

create policy "chord_images_storage_admin_delete" on storage.objects
  for delete using (bucket_id = 'chord-images' and public.is_admin());

insert into public.services (service_type, service_date, title, theme)
values
  ('saturday', '2026-07-11 19:00:00+07', 'Ibadah PHD', 'Youth Service - Saturday Night'),
  ('youth', '2026-07-12 18:00:00+07', 'Ibadah Minggu Sore', 'Serve with joy')
on conflict do nothing;

insert into public.weekly_agenda (weekday, time, title, description, location, accent, sort_order)
values
  ('Wednesday', '19:30', 'Partangiangan', 'Doa dan persekutuan santai di tengah minggu.', 'Rumah jemaat / sesuai info grup', 'teal', 1),
  ('Friday', '19:00', 'Sports Night', 'Aktivitas olahraga dan fellowship Naposo.', 'Lapangan / venue mingguan', 'amber', 2),
  ('Saturday', '19:00', 'Youth Service - Ibadah PHD', 'Ibadah utama Naposo dengan tim worship dan pelayan mingguan.', 'HKBP Bintara', 'rose', 3),
  ('Sunday', '18:00', 'Sunday Youth Service', 'Ibadah sore Minggu bersama singer, band, dan media.', 'HKBP Bintara', 'blue', 4)
on conflict do nothing;

insert into public.events (title, event_date, location, description, status)
values
  ('Naposo Fellowship Night', '2026-07-25 18:30:00+07', 'HKBP Bintara', 'Malam persekutuan, doa, games, dan persiapan pelayanan bulan depan.', 'published'),
  ('Latihan Musik Gabungan', '2026-08-02 14:00:00+07', 'Ruang Pemuda', 'Workshop aransemen dan koordinasi tim musik untuk ibadah pemuda.', 'published')
on conflict do nothing;
