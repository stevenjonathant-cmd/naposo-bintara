import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Instagram, MapPin, Music2, Ticket, UsersRound } from "lucide-react";
import { EventList } from "@/components/event-list";
import { HeroVideo } from "@/components/hero-video";
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
    image: "/brand/event-kunjungan-jogja.png"
  },
  {
    title: "Retreat Remaja Naposo",
    date: "Coming soon",
    location: "To be announced",
    description: "Retreat untuk bertumbuh bersama dalam firman, doa, fellowship, dan semangat pelayanan.",
    image: "/brand/event-retreat-reconnect.png"
  }
];

export default async function Home({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = getLocale(searchParams);
  const t = copy[locale];
  const [agenda, events] = await Promise.all([getWeeklyAgenda(), getEvents()]);

  return (
    <main className="bg-[#f7f7f4]">
      <section className="relative min-h-[calc(100svh-80px)] overflow-hidden bg-black text-white">
        <HeroVideo />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-5xl">
            <Image src="/brand/logo-hkbp-bintara.png" alt="NHKBP Bintara" width={170} height={170} className="mb-6 h-20 w-20 rounded-full bg-white/90 object-contain p-2 sm:h-24 sm:w-24" priority />
            <p className="eyebrow text-white/70">Naposobulung HKBP Bintara</p>
            <h1 className="mt-4 max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Worship. Serve. Grow Together.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/78">
              Agenda mingguan, info kegiatan, roster pelayanan, keuangan, dan chord untuk Naposobulung HKBP Bintara.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#agenda" className="church-button-light">
                Agenda This Week <ArrowRight size={18} />
              </Link>
              <Link href="/petugas-pelayanan" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5b2bd6] px-5 py-3 text-sm font-black text-white transition hover:bg-[#4620aa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Petugas Pelayanan <UsersRound size={18} />
              </Link>
              <Link href="/chords" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Buku Ende Chords <Music2 size={18} />
              </Link>
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
            <article key={event.title} className="church-card group">
              <div className="relative min-h-[520px] overflow-hidden bg-ink">
                <Image src={event.image} alt={event.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/18 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="eyebrow text-white/70">Featured Event</p>
                  <h3 className="mt-4 max-w-md text-5xl font-black uppercase leading-none sm:text-6xl">{event.title}</h3>
                  <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur">
                      <CalendarDays size={16} /> {event.date}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur">
                      <MapPin size={16} /> {event.location}
                    </span>
                  </div>
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
