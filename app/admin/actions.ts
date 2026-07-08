"use server";

import { revalidatePath } from "next/cache";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function list(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function fileList(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

async function requireAdmin() {
  if (!isSupabaseConfigured()) return createClient();

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Login required.");

  const { data: profile } = await supabase.from("profiles").select("is_approved, is_admin").eq("id", user.id).single();
  if (!profile?.is_approved || !profile.is_admin) throw new Error("Admin access required.");

  return supabase;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/members");
  revalidatePath("/chords");
  revalidatePath("/finance");
}

export async function updateWeeklyAgenda(formData: FormData) {
  const supabase = await requireAdmin();
  const id = text(formData, "id");

  await supabase
    .from("weekly_agenda")
    .update({
      weekday: text(formData, "weekday"),
      time: text(formData, "time"),
      title: text(formData, "title"),
      description: text(formData, "description"),
      location: text(formData, "location"),
      accent: text(formData, "accent") || "teal"
    })
    .eq("id", id);

  refresh();
}

export async function createWeeklyAgenda(formData: FormData) {
  const supabase = await requireAdmin();

  const { data: maxRow } = await supabase
    .from("weekly_agenda")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("weekly_agenda").insert({
    weekday: text(formData, "weekday"),
    time: text(formData, "time"),
    title: text(formData, "title"),
    description: text(formData, "description"),
    location: text(formData, "location"),
    accent: text(formData, "accent") || "teal",
    sort_order: Number(maxRow?.sort_order ?? 0) + 1
  });

  refresh();
}

export async function deleteWeeklyAgenda(formData: FormData) {
  const supabase = await requireAdmin();
  const id = text(formData, "id");

  await supabase.from("weekly_agenda").delete().eq("id", id);

  refresh();
}

export async function updateServiceRoster(formData: FormData) {
  const supabase = await requireAdmin();
  const serviceId = text(formData, "service_id");
  const serviceType = text(formData, "service_type");
  const serviceDate = text(formData, "service_date");

  await supabase
    .from("services")
    .update({
      title: text(formData, "title"),
      theme: text(formData, "theme"),
      service_date: serviceDate ? new Date(serviceDate).toISOString() : new Date().toISOString()
    })
    .eq("id", serviceId);

  const roles =
    serviceType === "saturday"
      ? ["Worship Leader", "Guitar", "Cajonist", "Pelean / Offering"]
      : ["Singers", "Keyboard", "Guitar", "Bass", "Drums", "Media / Presenter"];

  await supabase.from("service_assignments").delete().eq("service_id", serviceId);

  const rows = roles.flatMap((role, roleIndex) =>
    list(text(formData, `role:${role}`)).map((person, personIndex) => ({
      service_id: serviceId,
      role,
      person_name: person,
      sort_order: roleIndex * 100 + personIndex
    }))
  );

  if (rows.length > 0) {
    await supabase.from("service_assignments").insert(rows);
  }

  refresh();
}

export async function createSong(formData: FormData) {
  const supabase = await requireAdmin();
  const imageUrls = list(text(formData, "image_urls"));
  const imageFiles = fileList(formData, "image_files");

  const { data: song } = await supabase
    .from("songs")
    .insert({
      title: text(formData, "title"),
      category: text(formData, "category") || "General",
      song_number: text(formData, "song_number") || null,
      original_key: text(formData, "original_key") || null,
      chord_text: text(formData, "chord_text") || null,
      tags: list(text(formData, "tags"))
    })
    .select("id")
    .single();

  if (song) {
    const uploadedUrls: string[] = [];
    for (let index = 0; index < imageFiles.length; index += 1) {
      const file = imageFiles[index];
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${song.id}/${Date.now()}-${index}.${extension}`;
      const { error } = await supabase.storage.from("chord-images").upload(path, file, {
        contentType: file.type || "image/jpeg",
        upsert: false
      });

      if (!error) {
        const { data } = supabase.storage.from("chord-images").getPublicUrl(path);
        uploadedUrls.push(data.publicUrl);
      }
    }

    const allImages = [...uploadedUrls, ...imageUrls];

    if (allImages.length > 0) {
      await supabase.from("song_images").insert(
        allImages.map((imagePath, index) => ({
        song_id: song.id,
        image_path: imagePath,
        sort_order: index
        }))
      );
    }
  }

  refresh();
}

export async function createFinanceReport(formData: FormData) {
  const supabase = await requireAdmin();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  await supabase.from("finance_reports").insert({
    title: text(formData, "title"),
    month: Number(text(formData, "month")),
    year: Number(text(formData, "year")),
    notes: text(formData, "notes"),
    file_url: text(formData, "file_url"),
    uploaded_by: user?.id ?? null
  });

  refresh();
}

export async function updateProfileRoles(formData: FormData) {
  const supabase = await requireAdmin();
  const id = text(formData, "id");

  await supabase
    .from("profiles")
    .update({
      display_name: text(formData, "display_name"),
      is_approved: bool(formData, "is_approved"),
      is_admin: bool(formData, "is_admin"),
      is_finance: bool(formData, "is_finance")
    })
    .eq("id", id);

  refresh();
}
