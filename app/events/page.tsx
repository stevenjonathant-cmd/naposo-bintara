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
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="eyebrow text-ember">Events</p>
        <h1 className="mt-2 text-4xl font-black text-ink sm:text-5xl">Acara dan Kegiatan</h1>
        <p className="mt-3 text-lg font-semibold leading-8 text-graphite/70">Event besar, kegiatan bulanan, dan rencana pelayanan berikutnya.</p>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {featuredEvents.map((event) => (
          <article key={event.title} className="glass-panel overflow-hidden rounded">
            <div className={`${event.tone} min-h-80 p-6`}>
              <p className="eyebrow text-white/70">Featured Event</p>
              <h2 className="mt-10 max-w-md text-5xl font-black leading-none">{event.title}</h2>
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
              <Link href="/admin" className="focus-ring mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-black text-white">
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
