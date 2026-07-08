export type Locale = "id" | "en";

export const copy = {
  id: {
    home: "Beranda",
    schedules: "Jadwal",
    events: "Acara",
    chords: "Chord",
    finance: "Keuangan",
    admin: "Admin",
    signIn: "Masuk",
    heroTitle: "Naposo Bintara",
    heroSubtitle:
      "Pusat jadwal pelayanan, acara, chord lagu, dan laporan untuk Naposobulung HKBP Bintara.",
    saturdayService: "Ibadah Sabtu",
    youthService: "Ibadah Pemuda",
    upcomingEvents: "Acara Terdekat",
    thisMonthRoster: "Roster Bulan Ini",
    protectedArea: "Area anggota",
    approvalNeeded: "Akun perlu disetujui admin sebelum area ini terbuka."
  },
  en: {
    home: "Home",
    schedules: "Schedules",
    events: "Events",
    chords: "Chords",
    finance: "Finance",
    admin: "Admin",
    signIn: "Sign in",
    heroTitle: "Naposo Bintara",
    heroSubtitle:
      "A ministry hub for schedules, events, chord sheets, and reports for Naposobulung HKBP Bintara.",
    saturdayService: "Saturday Service",
    youthService: "Youth Service",
    upcomingEvents: "Upcoming Events",
    thisMonthRoster: "This Month's Roster",
    protectedArea: "Member area",
    approvalNeeded: "Your account must be approved by an admin before this area opens."
  }
} satisfies Record<Locale, Record<string, string>>;

export function getLocale(searchParams?: { lang?: string }): Locale {
  return searchParams?.lang === "en" ? "en" : "id";
}
