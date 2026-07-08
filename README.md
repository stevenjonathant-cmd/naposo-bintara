# Naposo Bintara

Mobile-first website for NHKBP Bintara / Naposobulung HKBP Bintara.

## Features

- Public schedules for Saturday Service and Sunday Youth Service.
- Public events page.
- Member-only chord image repository.
- Finance-only report file area.
- Admin dashboard scaffold for schedules, events, chords, finance files, and member approvals.
- Indonesian-first content with a bilingual UI foundation.
- Supabase-ready auth, tables, row level security, and storage-friendly file paths.

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the app:

```bash
pnpm dev
```

Without Supabase env vars, the app uses demo data and opens protected areas with a demo admin profile. With Supabase configured, protected pages use real auth and role flags from `profiles`.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create storage buckets for chord images and finance report files.
4. Add the project URL and anon key to `.env.local`.
5. Set `NEXT_PUBLIC_SITE_URL` to your local or deployed URL for magic link redirects.
6. Sign up once on the live site, then run `supabase/make-first-admin.sql` with your email to approve your first admin account.

## Deployment

Deploy to Vercel and set these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
