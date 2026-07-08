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
    <main className="section-shell">
      <SaveToast saved={searchParams?.saved} />
      <div className="church-card bg-ink p-7 text-white">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Chord Admin</p>
        <h1 className="mt-2 text-5xl font-black uppercase leading-none sm:text-6xl">Kelola Buku Ende Chords</h1>
        <p className="mt-3 max-w-3xl text-white/70">
          Upload gambar chord, isi No, Judul, nada dasar original, dan chord text jika ingin fitur transpose aktif.
        </p>
        <Link href="/admin" className="church-button-light mt-5">
          Kembali ke Admin Utama
        </Link>
      </div>
      <div className="mt-8">
        <ChordAdminForm songs={songs} />
      </div>
    </main>
  );
}
