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
    <main className="bg-[#f7f7f4]">
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:px-8">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-ember shadow-sm">
              <Sparkles size={15} /> NHKBP Bintara
            </p>
            <h1 className="mt-6 max-w-4xl text-6xl font-black uppercase leading-[0.88] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Naposo Bintara
            </h1>
            <p className="mt-6 max-w-xl text-lg font-bold leading-8 text-graphite/70">
              Agenda mingguan, info kegiatan, roster pelayanan, keuangan, dan chord untuk Naposobulung HKBP Bintara.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agenda" className="church-button-dark">
                Agenda This Week <ArrowRight size={18} />
              </Link>
              <Link href="/petugas-pelayanan" className="church-button-light">
                Petugas Pelayanan <UsersRound size={18} />
              </Link>
            </div>
          </div>

          <div className="photo-panel min-h-[560px] rounded-[36px] p-5 shadow-glow sm:p-7">
            <div className="absolute bottom-7 left-7 right-7">
              <p className="max-w-xl text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                Built for worship, service, and community.
              </p>
            </div>
            <div className="ml-auto max-w-sm rounded-[28px] border border-white/15 bg-black/35 p-5 text-white backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-mango">
                <CalendarDays size={18} /> This Week
              </p>
              <div className="mt-5 grid gap-3">
                {agenda.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div>
                      <p className="text-sm font-black text-white/55">{item.weekday}</p>
                      <p className="mt-1 font-black">{item.title}</p>
                    </div>
                    <p className="rounded-full bg-white px-3 py-1 text-sm font-black text-ink">{item.time}</p>
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
          <Link href="/events" className="church-button-light w-fit">
            Semua Events <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredEvents.map((event) => (
            <article key={event.title} className="church-card">
              <div className={`${event.tone} poster-panel min-h-80 p-7`}>
                <p className="eyebrow text-white/70">Poster Event</p>
                <h3 className="mt-10 max-w-md text-5xl font-black uppercase leading-none sm:text-6xl">{event.title}</h3>
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
                <Link href="/events" className="church-button-dark mt-5">
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
          <Link href="https://www.instagram.com/p/DPI-IlTjw4X/" target="_blank" className="church-button-dark w-fit">
            Instagram Naposobulung <Instagram size={16} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {instagramPosts.map((post) => (
            <Link key={post.href} href={post.href} target="_blank" className="focus-ring group church-card block">
              <div className="poster-panel min-h-64 bg-ink p-6 text-white transition group-hover:bg-ember">
                <Instagram size={24} />
                <p className="mt-12 text-sm font-black uppercase tracking-[0.24em] text-white/60">{post.label}</p>
                <h3 className="mt-3 text-3xl font-black uppercase leading-none">{post.title}</h3>
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
        <div className="church-card flex flex-col justify-between gap-5 bg-ink p-7 text-white md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Next layer</p>
            <h2 className="mt-2 text-3xl font-black uppercase leading-none">Petugas pelayanan, finance, and chords live after the public agenda.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/petugas-pelayanan" className="church-button-light">
              Petugas Pelayanan <ArrowRight size={18} />
            </Link>
            <Link href="/chords" className="church-button-light">
              Browse Chords <Music2 size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
