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
7. If upgrading an existing database, run `supabase/chords-upgrade.sql` to add chord metadata/transposition fields.

## Deployment

Deploy to Vercel and set these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- Optional: `GOOGLE_ROSTER_CSV_URL`

## Google Sheet Roster

The site can use a published Google Sheet as the monthly roster source. Upload `outputs/naposo-bintara-monthly-roster-template.xlsx` into Google Sheets, then fill the first two tabs:

- `Pelayanan PHD Sabtu`
- `Pelayanan Minggu Sore`

The third tab, `Website Ready`, is generated from the first two tabs and should be published as CSV for the website.

Required columns:

```txt
service_date, service_type, title, theme, role, people, notes
```

Rules:

- Admins only need to edit the first two tabs.
- Each row is one service date, with role columns across the row.
- Empty singer/musician/song slots are okay; the generated website feed leaves them blank and the site ignores them.
- The `Website Ready` tab converts each row into the normalized website format.
- `service_type` must be `saturday` or `youth`.
- Publish the `Website Ready` tab as CSV and put that URL in Vercel as `GOOGLE_ROSTER_CSV_URL`.

When this environment variable is set, the website reads rosters from the sheet and automatically shows the next upcoming services based on the current date.
