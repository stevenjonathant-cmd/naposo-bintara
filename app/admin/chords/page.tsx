import Link from "next/link";
import { ChordAdminForm } from "@/components/chord-admin-form";
import { ProtectedNotice } from "@/components/protected-notice";
import { SaveToast } from "@/components/save-toast";
import { getCurrentProfile, getSongs } from "@/lib/data";

export default async function AdminChordsPage({ searchParams }: { searchParams?: { saved?: string } }) {
  const profile = await getCurrentProfile();
  if (!profile?.is_approved || !profile.is_admin) {
    return <ProtectedNotice title="Admin Buku Ende Chords" message="Area ini hanya untuk admin yang sudah disetujui." />;
  }

  const songs = await getSongs();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SaveToast saved={searchParams?.saved} />
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Chord Admin</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Kelola Buku Ende Chords</h1>
        <p className="mt-3 text-graphite/70">
          Upload gambar chord, isi No, Judul, nada dasar original, dan chord text jika ingin fitur transpose aktif.
        </p>
        <Link href="/admin" className="focus-ring mt-5 inline-flex rounded border border-ink/15 bg-white px-4 py-2 text-sm font-black text-ink">
          Kembali ke Admin Utama
        </Link>
      </div>
      <div className="mt-8">
        <ChordAdminForm songs={songs} />
      </div>
    </main>
  );
}
