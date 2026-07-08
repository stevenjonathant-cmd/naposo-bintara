import Link from "next/link";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { EventList } from "@/components/event-list";
import { getEvents } from "@/lib/data";

const featuredEvents = [
  {
    title: "Kunjungan Jogja",
    date: "Coming soon",
    location: "Yogyakarta",
    description: "Poster dan detail dapat disesuaikan nanti dari admin/event content.",
    tone: "bg-teal text-white"
  },
  {
    title: "Retreat Remaja Naposo",
    date: "Coming soon",
    location: "To be announced",
    description: "Ruang khusus untuk event besar dengan poster, tanggal, lokasi, dan call-to-action.",
    tone: "bg-ink text-white"
  }
];

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="section-shell">
      <div className="max-w-4xl">
        <p className="eyebrow text-ember">Events</p>
        <h1 className="mt-3 text-5xl font-black uppercase leading-none text-ink sm:text-7xl">Acara dan Kegiatan</h1>
        <p className="mt-4 text-lg font-bold leading-8 text-graphite/70">Event besar, kegiatan bulanan, dan rencana pelayanan berikutnya.</p>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {featuredEvents.map((event) => (
          <article key={event.title} className="church-card">
            <div className={`${event.tone} poster-panel min-h-96 p-7`}>
              <p className="eyebrow text-white/70">Featured Event</p>
              <h2 className="mt-12 max-w-md text-5xl font-black uppercase leading-none sm:text-6xl">{event.title}</h2>
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
              <Link href="/admin" className="church-button-dark mt-5">
                Kelola Event <Ticket size={16} />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <EventList events={events} />
      </div>
    </main>
  );
}
