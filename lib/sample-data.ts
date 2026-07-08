import type { Event, FinanceReport, Service, Song, WeeklyAgendaItem } from "@/lib/types";

export const services: Service[] = [
  {
    id: "sat-2026-07-11",
    service_type: "saturday",
    service_date: "2026-07-11T19:00:00+07:00",
    title: "Ibadah PHD",
    theme: "Youth Service - Saturday Night",
    assignments: [
      { role: "Worship Leader", people: ["Mika", "Grace"] },
      { role: "Guitar", people: ["Andre", "Jonathan"] },
      { role: "Cajonist", people: ["Samuel"] },
      { role: "Pelean / Offering", people: ["Claudia"] }
    ]
  },
  {
    id: "youth-2026-07-12",
    service_type: "youth",
    service_date: "2026-07-12T18:00:00+07:00",
    title: "Ibadah Minggu Sore",
    theme: "Serve with joy",
    assignments: [
      { role: "Singers", people: ["Ruth", "Debora", "Mario"] },
      { role: "Keyboard", people: ["Daniel"] },
      { role: "Guitar", people: ["Evan"] },
      { role: "Bass", people: ["Kevin"] },
      { role: "Drums", people: ["Bima"] },
      { role: "Media / Presenter", people: ["Nadia"] }
    ]
  }
];

export const weeklyAgenda: WeeklyAgendaItem[] = [
  {
    id: "wed-partangiangan",
    weekday: "Wednesday",
    time: "19:30",
    title: "Partangiangan",
    description: "Doa dan persekutuan santai di tengah minggu.",
    location: "Rumah jemaat / sesuai info grup",
    accent: "teal"
  },
  {
    id: "fri-sports",
    weekday: "Friday",
    time: "19:00",
    title: "Sports Night",
    description: "Aktivitas olahraga dan fellowship Naposo.",
    location: "Lapangan / venue mingguan",
    accent: "amber"
  },
  {
    id: "sat-phd",
    weekday: "Saturday",
    time: "19:00",
    title: "Youth Service - Ibadah PHD",
    description: "Ibadah utama Naposo dengan tim worship dan pelayan mingguan.",
    location: "HKBP Bintara",
    accent: "rose"
  },
  {
    id: "sun-service",
    weekday: "Sunday",
    time: "18:00",
    title: "Sunday Youth Service",
    description: "Ibadah sore Minggu bersama singer, band, dan media.",
    location: "HKBP Bintara",
    accent: "blue"
  }
];

export const events: Event[] = [
  {
    id: "retreat-2026",
    title: "Naposo Fellowship Night",
    event_date: "2026-07-25T18:30:00+07:00",
    location: "HKBP Bintara",
    description: "Malam persekutuan, doa, games, dan persiapan pelayanan bulan depan.",
    status: "published"
  },
  {
    id: "music-workshop",
    title: "Latihan Musik Gabungan",
    event_date: "2026-08-02T14:00:00+07:00",
    location: "Ruang Pemuda",
    description: "Workshop aransemen dan koordinasi tim musik untuk ibadah pemuda.",
    status: "published"
  }
];

export const songs: Song[] = [
  {
    id: "be-356",
    title: "Buku Ende 356",
    category: "Buku Ende",
    song_number: "356",
    original_key: "G",
    chord_text: "G        D/F#       Em\nSai tong ingotonku...\nC        G/B        Am    D\nChord text bisa ditranspose di website.",
    tags: ["ende", "ibadah", "batak"],
    image_urls: ["/placeholder-chord.svg"]
  },
  {
    id: "ku-mau-cinta-yesus",
    title: "Ku Mau Cinta Yesus",
    category: "Praise",
    original_key: "C",
    chord_text: "C          G/B\nKu mau cinta Yesus\nAm         F\nSelamanya",
    tags: ["youth", "praise"],
    image_urls: ["/placeholder-chord.svg"]
  }
];

export const financeReports: FinanceReport[] = [
  {
    id: "finance-2026-07",
    title: "Laporan Keuangan Juli 2026",
    month: 7,
    year: 2026,
    notes: "Contoh laporan file-only. Upload PDF atau spreadsheet asli di admin finance.",
    file_url: "#"
  }
];
