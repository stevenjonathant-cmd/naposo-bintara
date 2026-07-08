import { FileText, WalletCards } from "lucide-react";
import { getFinanceReports } from "@/lib/data";

export default async function FinancePage() {
  const reports = await getFinanceReports();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
            <WalletCards size={22} />
          </span>
          <div>
            <p className="eyebrow text-teal">Finance</p>
            <h1 className="text-4xl font-black text-ink">Laporan Keuangan</h1>
          </div>
        </div>
        <p className="mt-4 text-base font-semibold leading-7 text-graphite/70">File laporan bulanan untuk anggota dengan akses finance.</p>
      </section>

      <div className="mt-8 grid gap-4">
        {reports.map((report) => (
          <article key={report.id} className="glass-panel flex flex-col gap-4 rounded p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-mango/30 text-ink">
                <FileText size={22} />
              </span>
              <div>
                <h2 className="text-xl font-black text-ink">{report.title}</h2>
                <p className="mt-1 text-sm font-semibold text-graphite/60">
                  {report.month}/{report.year} {report.notes ? `- ${report.notes}` : ""}
                </p>
              </div>
            </div>
            <a href={report.file_url} className="focus-ring rounded bg-ink px-4 py-2 text-center text-sm font-black text-white">
              Buka file
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
