"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  if (!email) {
    redirect("/login?status=email");
  }

  if (!isSupabaseConfigured()) {
    redirect("/login?status=demo");
  }

  const supabase = createClient();
  const origin = headers().get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  redirect("/login?status=sent");
}
