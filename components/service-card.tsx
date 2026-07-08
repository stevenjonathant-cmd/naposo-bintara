import { CalendarDays, Music2, UsersRound } from "lucide-react";
import type { Service } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta"
});

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="church-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-teal">
            <CalendarDays size={15} /> {dateFormatter.format(new Date(service.service_date))}
          </p>
          <h3 className="mt-3 text-3xl font-black uppercase leading-none text-ink">{service.title}</h3>
          {service.theme ? <p className="mt-1 font-semibold text-graphite/60">{service.theme}</p> : null}
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white">
          <Music2 size={20} />
        </span>
      </div>

      <dl className="mt-5 grid gap-3">
        {service.assignments.map((assignment) => (
          <div key={assignment.role} className="grid gap-1 rounded-2xl border border-ink/10 bg-neutral-50 px-3 py-3 sm:grid-cols-[170px_1fr]">
            <dt className="flex items-center gap-2 text-sm font-black text-ink">
              <UsersRound size={15} /> {assignment.role}
            </dt>
            <dd className="text-sm font-semibold text-graphite/70">{assignment.people.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
