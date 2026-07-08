-- Run this after you sign up once on the website.
-- Replace the email below with the email you used to sign up.

update public.profiles
set
  is_approved = true,
  is_admin = true,
  is_finance = true,
  updated_at = now()
where id = (
  select id
  from auth.users
  where email = 'YOUR_EMAIL_HERE'
);
