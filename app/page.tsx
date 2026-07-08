import Link from "next/link";
import { ArrowRight, CalendarDays, Music2, Sparkles, UsersRound } from "lucide-react";
import { EventList } from "@/components/event-list";
import { WeekAgenda } from "@/components/week-agenda";
import { copy, getLocale } from "@/lib/i18n";
import { getEvents, getWeeklyAgenda } from "@/lib/data";

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
              <Link href="/members" className="focus-ring inline-flex items-center gap-2 rounded border border-ink/10 bg-white/102 px-5 py-3 font-black text-ink backdrop-blur">
                Member Area <UsersRound size={18} />
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
        <h2 className="mb-5 text-3xl font-black text-ink">{t.upcomingEvents}</h2>
        <EventList events={events.slice(0, 4)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col justify-between gap-5 rounded p-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-ember">Next layer</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Rosters, finance, and chords live after the public agenda.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/members" className="focus-ring inline-flex items-center gap-2 rounded bg-ink px-5 py-3 font-black text-white">
              Open Member Area <ArrowRight size={18} />
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
