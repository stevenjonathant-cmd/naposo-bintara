import { events as sampleEvents, financeReports, services as sampleServices, songs as sampleSongs, weeklyAgenda } from "@/lib/sample-data";
import type { Event, FinanceReport, Profile, Service, Song, WeeklyAgendaItem } from "@/lib/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return sampleServices;
  const supabase = createClient();
  const { data } = await supabase
    .from("services")
    .select("id, service_type, service_date, title, theme, notes, service_assignments(role, person_name, sort_order)")
    .order("service_date", { ascending: true });

  return (data ?? []).map((service: any) => {
    const grouped = new Map<string, string[]>();
    for (const item of service.service_assignments ?? []) {
      grouped.set(item.role, [...(grouped.get(item.role) ?? []), item.person_name]);
    }
    return {
      id: service.id,
      service_type: service.service_type,
      service_date: service.service_date,
      title: service.title,
      theme: service.theme,
      notes: service.notes,
      assignments: Array.from(grouped, ([role, people]) => ({ role, people }))
    };
  });
}

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) return sampleEvents;
  const supabase = createClient();
  const { data } = await supabase
    .from("events")
    .select("id, title, event_date, location, description, status")
    .eq("status", "published")
    .order("event_date", { ascending: true });
  return (data ?? []) as Event[];
}

export async function getSongs(): Promise<Song[]> {
  if (!isSupabaseConfigured()) return sampleSongs;
  const supabase = createClient();
  const { data } = await supabase
    .from("songs")
    .select("id, title, category, song_number, tags, song_images(image_path, sort_order)")
    .order("title", { ascending: true });
  return (data ?? []).map((song: any) => ({
    id: song.id,
    title: song.title,
    category: song.category,
    song_number: song.song_number,
    tags: song.tags ?? [],
    image_urls: (song.song_images ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((image: any) => image.image_path)
  }));
}

export async function getFinanceReports(): Promise<FinanceReport[]> {
  if (!isSupabaseConfigured()) return financeReports;
  const supabase = createClient();
  const { data } = await supabase
    .from("finance_reports")
    .select("id, title, month, year, notes, file_url")
    .order("year", { ascending: false })
    .order("month", { ascending: false });
  return (data ?? []) as FinanceReport[];
}

export async function getWeeklyAgenda(): Promise<WeeklyAgendaItem[]> {
  if (!isSupabaseConfigured()) return weeklyAgenda;
  const supabase = createClient();
  const { data } = await supabase
    .from("weekly_agenda")
    .select("id, weekday, time, title, description, location, accent")
    .order("sort_order", { ascending: true });
  return (data ?? []) as WeeklyAgendaItem[];
}

export async function getCurrentProfile(): Promise<Profile | null> {
  if (!isSupabaseConfigured()) {
    return {
      id: "demo",
      display_name: "Demo Admin",
      is_approved: true,
      is_admin: true,
      is_finance: true
    };
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function getProfiles(): Promise<Profile[]> {
  if (!isSupabaseConfigured()) {
    return [
      {
        id: "demo",
        display_name: "Demo Admin",
        is_approved: true,
        is_admin: true,
        is_finance: true
      }
    ];
  }

  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  return (data ?? []) as Profile[];
}
