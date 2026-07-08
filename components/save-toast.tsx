import { CheckCircle2 } from "lucide-react";

const messages: Record<string, string> = {
  agenda: "Agenda berhasil disimpan.",
  "agenda-created": "Agenda baru berhasil ditambahkan.",
  "agenda-deleted": "Agenda berhasil dihapus.",
  roster: "Roster pelayanan berhasil disimpan.",
  finance: "Laporan keuangan berhasil disimpan.",
  user: "Akses anggota berhasil disimpan.",
  chord: "Buku Ende chord berhasil disimpan.",
  "chord-updated": "Buku Ende chord berhasil diperbarui."
};

export function SaveToast({ saved }: { saved?: string }) {
  if (!saved) return null;

  return (
    <div className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded border border-teal/25 bg-white px-4 py-3 text-sm font-black text-ink shadow-glow">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-teal text-white">
        <CheckCircle2 size={18} />
      </span>
      <span>{messages[saved] ?? "Perubahan berhasil disimpan."}</span>
    </div>
  );
}
