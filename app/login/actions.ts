"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function clean(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function signInWithPassword(formData: FormData) {
  const email = clean(formData, "email");
  const password = clean(formData, "password");

  if (!email || !password) {
    redirect("/login?status=password-required");
  }

  if (!isSupabaseConfigured()) {
    redirect("/login?status=demo");
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    const message = encodeURIComponent(error.message);
    redirect(`/login?status=password-error&message=${message}`);
  }

  redirect("/admin");
}

export async function signInWithEmail(formData: FormData) {
  const email = clean(formData, "email");
  if (!email) {
    redirect("/login?status=email");
  }

  if (!isSupabaseConfigured()) {
    redirect("/login?status=demo");
  }

  const supabase = createClient();
  const origin = headers().get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    const message = encodeURIComponent(error.message);
    redirect(`/login?status=auth-error&message=${message}`);
  }

  redirect("/login?status=sent");
}
