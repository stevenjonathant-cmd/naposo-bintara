import { CalendarClock, MapPin } from "lucide-react";
import type { WeeklyAgendaItem } from "@/lib/types";

const accentStyles: Record<WeeklyAgendaItem["accent"], string> = {
  teal: "border-teal/20 bg-teal/10 text-teal",
  amber: "border-mango/30 bg-mango/15 text-ink",
  rose: "border-ember/20 bg-ember/10 text-ember",
  blue: "border-skydeep/20 bg-skydeep/10 text-skydeep"
};

export function WeekAgenda({ items }: { items: WeeklyAgendaItem[] }) {
  return (
    <section className="section-shell">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow text-teal">Public agenda</p>
          <h2 className="mt-2 text-4xl font-black uppercase leading-none text-ink sm:text-6xl">Agenda This Week</h2>
        </div>
        <p className="max-w-xl text-base font-bold leading-7 text-graphite/70">
          Weekly rhythm for Naposo Bintara. These items are editable from the admin area once Supabase is connected.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        {items.map((item) => (
          <article key={item.id} className="church-card p-4">
            <div className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2 ${accentStyles[item.accent]}`}>
              <span className="text-sm font-black uppercase tracking-wide">{item.weekday}</span>
              <span className="inline-flex items-center gap-1 text-sm font-black">
                <CalendarClock size={15} /> {item.time}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-black uppercase leading-none text-ink">{item.title}</h3>
            <p className="mt-2 min-h-12 text-sm font-medium leading-6 text-graphite/70">{item.description}</p>
            <p className="mt-4 flex items-start gap-2 text-sm font-bold text-graphite/65">
              <MapPin className="mt-0.5 shrink-0" size={15} /> {item.location}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
