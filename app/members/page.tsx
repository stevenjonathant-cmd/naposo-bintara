import Link from "next/link";
import { ArrowRight, FileText, LockKeyhole, WalletCards } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { getFinanceReports, getUpcomingServices } from "@/lib/data";

export default async function MembersPage() {
  const [services, reports] = await Promise.all([getUpcomingServices(2), getFinanceReports()]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-teal">Preview mode</p>
          <h1 className="mt-2 text-4xl font-black text-ink sm:text-5xl">Member Area</h1>
          <p className="mt-3 text-graphite/70">
            This page shows what members will see after login: this week&apos;s service rosters and finance reports. Access is intentionally open right now so you can review the design.
          </p>
        </div>
        <div className="glass-panel flex items-center gap-3 rounded px-4 py-3 text-sm font-bold text-graphite/75">
          <LockKeyhole size={18} className="text-teal" />
          Login gate can be re-enabled later.
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ember">This week</p>
            <h2 className="mt-2 text-3xl font-black text-ink">Service Rosters</h2>
          </div>
          <Link href="/chords" className="focus-ring inline-flex w-fit items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
            Chords Page <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {services.slice(0, 2).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded bg-ink text-white">
            <WalletCards size={20} />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-teal">Finance</p>
            <h2 className="text-3xl font-black text-ink">Financial Reports</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {reports.map((report) => (
            <article key={report.id} className="glass-panel flex flex-col gap-4 rounded p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-mango/20 text-ink">
                  <FileText size={21} />
                </span>
                <div>
                  <h3 className="text-xl font-black text-ink">{report.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-graphite/65">
                    {report.month}/{report.year} {report.notes ? `- ${report.notes}` : ""}
                  </p>
                </div>
              </div>
              <a href={report.file_url} className="focus-ring rounded border border-ink/10 bg-white px-4 py-2 text-center text-sm font-black text-ink">
                Open file
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
