import { AdminForm } from "@/components/admin-form";
import { ProtectedNotice } from "@/components/protected-notice";
import { getCurrentProfile, getFinanceReports, getProfiles, getServices, getSongs, getWeeklyAgenda } from "@/lib/data";

export default async function AdminPage() {
  const profile = await getCurrentProfile();
  if (!profile?.is_approved || !profile.is_admin) {
    return <ProtectedNotice title="Admin Naposo" message="Area ini hanya untuk admin yang sudah disetujui." />;
  }

  const [agenda, services, songs, reports, profiles] = await Promise.all([
    getWeeklyAgenda(),
    getServices(),
    getSongs(),
    getFinanceReports(),
    getProfiles()
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Dashboard</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Kelola Konten</h1>
        <p className="mt-3 text-graphite/70">
          Edit agenda mingguan, roster pelayanan, chord, laporan keuangan, dan approval anggota dari satu tempat.
        </p>
      </div>
      <div className="mt-8">
        <AdminForm agenda={agenda} services={services} songs={songs} reports={reports} profiles={profiles} />
      </div>
    </main>
  );
}
