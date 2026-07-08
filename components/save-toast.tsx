"use client";

import { CheckCircle2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const messages: Record<string, string> = {
  agenda: "Agenda berhasil disimpan.",
  "agenda-created": "Agenda baru berhasil ditambahkan.",
  "agenda-deleted": "Agenda berhasil dihapus.",
  roster: "Roster pelayanan berhasil disimpan.",
  finance: "Laporan keuangan berhasil disimpan.",
  user: "Akses anggota berhasil disimpan.",
  chord: "Buku Ende chord berhasil disimpan.",
  "chord-updated": "Buku Ende chord berhasil diperbarui.",
  "chord-deleted": "Buku Ende chord berhasil dihapus."
};

export function SaveToast({ saved }: { saved?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!saved) return;

    const timeout = window.setTimeout(() => {
      router.replace(pathname, { scroll: false });
    }, 1100);

    return () => window.clearTimeout(timeout);
  }, [pathname, router, saved]);

  if (!saved) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/80 px-5 backdrop-blur-md">
      <div className="grid w-full max-w-md justify-items-center rounded bg-white p-8 text-center shadow-glow">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-teal text-white">
          <CheckCircle2 size={34} />
        </span>
        <p className="mt-5 text-2xl font-black text-ink">Berhasil disimpan</p>
        <p className="mt-2 text-sm font-bold text-graphite/65">{messages[saved] ?? "Perubahan berhasil disimpan."}</p>
        <p className="mt-4 text-xs font-black uppercase tracking-wide text-teal">Mengembalikan ke halaman awal...</p>
      </div>
    </div>
  );
}
