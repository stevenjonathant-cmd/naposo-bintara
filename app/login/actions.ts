"use server";

import { redirect } from "next/navigation";
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
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback`
    }
  });

  redirect("/login?status=sent");
}
