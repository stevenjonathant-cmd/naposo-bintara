import { AdminForm } from "@/components/admin-form";
import { ProtectedNotice } from "@/components/protected-notice";
import { SaveToast } from "@/components/save-toast";
import { getCurrentProfile, getFinanceReports, getProfiles, getServices, getWeeklyAgenda } from "@/lib/data";
import Link from "next/link";

export default async function AdminPage({ searchParams }: { searchParams?: { saved?: string } }) {
  const profile = await getCurrentProfile();
  if (!profile?.is_approved || !profile.is_admin) {
    return <ProtectedNotice title="Admin Naposo" message="Area ini hanya untuk admin yang sudah disetujui." />;
  }

  const [agenda, services, reports, profiles] = await Promise.all([
    getWeeklyAgenda(),
    getServices(),
    getFinanceReports(),
    getProfiles()
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SaveToast saved={searchParams?.saved} />
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Kelola Konten</h1>
        <p className="mt-3 text-graphite/70">
          Edit agenda mingguan, roster pelayanan, laporan keuangan, dan approval anggota. Chord punya halaman admin sendiri supaya lebih rapi.
        </p>
        <Link href="/admin/chords" className="focus-ring mt-5 inline-flex rounded bg-ink px-4 py-2 text-sm font-black text-white">
          Kelola Buku Ende Chords
        </Link>
      </div>
      <div className="mt-8">
        <AdminForm agenda={agenda} services={services} reports={reports} profiles={profiles} />
      </div>
    </main>
  );
}
