import { MapPin } from "lucide-react";
import type { Event } from "@/lib/types";

const formatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta"
});

export function EventList({ events }: { events: Event[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <article key={event.id} className="glass-panel rounded p-5">
          <p className="text-xs font-black uppercase tracking-wide text-ember">
            {formatter.format(new Date(event.event_date))}
          </p>
          <h3 className="mt-2 text-xl font-black text-ink">{event.title}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm font-bold text-teal">
            <MapPin size={16} /> {event.location}
          </p>
          <p className="mt-3 text-sm leading-6 text-graphite/70">{event.description}</p>
        </article>
      ))}
    </div>
  );
}
