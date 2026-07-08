import Link from "next/link";
import { ArrowRight, CalendarDays, Instagram, MapPin, Music2, Sparkles, Ticket, UsersRound } from "lucide-react";
import { EventList } from "@/components/event-list";
import { WeekAgenda } from "@/components/week-agenda";
import { copy, getLocale } from "@/lib/i18n";
import { getEvents, getWeeklyAgenda } from "@/lib/data";

const instagramPosts = [
  {
    title: "Naposobulung Moment",
    href: "https://www.instagram.com/p/DXlpSDiPK2e//",
    label: "Post 01"
  },
  {
    title: "Youth Fellowship",
    href: "https://www.instagram.com/p/DYj6IToD7t8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    label: "Post 02"
  },
  {
    title: "Pelayanan & Komunitas",
    href: "https://www.instagram.com/p/DYl4lcpj1YA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    label: "Post 03"
  }
];

const featuredEvents = [
  {
    title: "Kunjungan Jogja",
    date: "Coming soon",
    location: "Yogyakarta",
    description: "Kegiatan kunjungan dan persekutuan bersama untuk membangun relasi, pelayanan, dan pengalaman iman.",
    tone: "bg-teal text-white"
  },
  {
    title: "Retreat Remaja Naposo",
    date: "Coming soon",
    location: "To be announced",
    description: "Retreat untuk bertumbuh bersama dalam firman, doa, fellowship, dan semangat pelayanan.",
    tone: "bg-ink text-white"
  }
];

export default async function Home({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams);
  const t = copy[locale];
  const [agenda, events] = await Promise.all([getWeeklyAgenda(), getEvents()]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded border border-ink/10 bg-white/76 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-teal shadow-sm backdrop-blur">
              <Sparkles size={15} /> NHKBP Bintara
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] text-ink sm:text-6xl lg:text-7xl">
              Naposo Bintara Ministry Hub
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-graphite/70">
              Agenda mingguan, info kegiatan, roster pelayanan, keuangan, dan chord untuk Naposobulung HKBP Bintara.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agenda" className="focus-ring inline-flex items-center gap-2 rounded bg-ink px-5 py-3 font-black text-white shadow-glow">
              Agenda This Week <ArrowRight size={18} />
              </Link>
              <Link href="/petugas-pelayanan" className="focus-ring inline-flex items-center gap-2 rounded border border-ink/10 bg-white px-5 py-3 font-black text-ink backdrop-blur">
                Petugas Pelayanan <UsersRound size={18} />
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded p-4 sm:p-5">
            <div className="rounded bg-ink p-5 text-white">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-mango">
                <CalendarDays size={18} /> This Week
              </p>
              <div className="mt-5 grid gap-3">
                {agenda.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded border border-white/10 bg-white/10 p-4">
                    <div>
                      <p className="text-sm font-black text-white/55">{item.weekday}</p>
                      <p className="mt-1 font-black">{item.title}</p>
                    </div>
                    <p className="rounded bg-white px-3 py-1 text-sm font-black text-ink">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="agenda">
        <WeekAgenda items={agenda} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ember">Featured</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Next Events</h2>
          </div>
          <Link href="/events" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-black text-ink">
            Semua Events <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredEvents.map((event) => (
            <article key={event.title} className="glass-panel overflow-hidden rounded">
              <div className={`${event.tone} min-h-72 p-6`}>
                <p className="eyebrow text-white/70">Poster Event</p>
                <h3 className="mt-8 max-w-md text-5xl font-black leading-none">{event.title}</h3>
                <div className="mt-8 flex flex-wrap gap-3 text-sm font-black">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                    <CalendarDays size={16} /> {event.date}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2">
                    <MapPin size={16} /> {event.location}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold leading-6 text-graphite/70">{event.description}</p>
                <Link href="/events" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-black text-white">
                  Detail Event <Ticket size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-3xl font-black text-ink">{t.upcomingEvents}</h2>
        <EventList events={events.slice(0, 4)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-teal">Social</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Instagram Highlights</h2>
          </div>
          <Link href="https://www.instagram.com/p/DPI-IlTjw4X/" target="_blank" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-black text-white">
            Instagram Naposobulung <Instagram size={16} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {instagramPosts.map((post) => (
            <Link key={post.href} href={post.href} target="_blank" className="focus-ring group glass-panel block overflow-hidden rounded">
              <div className="min-h-52 bg-ink p-5 text-white transition group-hover:bg-teal">
                <Instagram size={24} />
                <p className="mt-12 text-sm font-black uppercase tracking-[0.24em] text-white/60">{post.label}</p>
                <h3 className="mt-3 text-2xl font-black leading-tight">{post.title}</h3>
              </div>
              <div className="flex items-center justify-between p-4 text-sm font-black text-ink">
                View on Instagram
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col justify-between gap-5 rounded p-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Next layer</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Petugas pelayanan, finance, and chords live after the public agenda.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/petugas-pelayanan" className="focus-ring inline-flex items-center gap-2 rounded bg-ink px-5 py-3 font-black text-white">
              Petugas Pelayanan <ArrowRight size={18} />
            </Link>
            <Link href="/chords" className="focus-ring inline-flex items-center gap-2 rounded border border-ink/10 bg-white px-5 py-3 font-black text-ink">
              Browse Chords <Music2 size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
