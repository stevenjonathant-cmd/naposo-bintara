"use client";

import { useState } from "react";
import { CalendarPlus, FileUp, Music, Save, UserCheck } from "lucide-react";

const panels = [
  {
    title: "Agenda mingguan",
    icon: CalendarPlus,
    fields: ["Hari", "Jam", "Nama kegiatan", "Lokasi", "Deskripsi singkat"]
  },
  {
    title: "Roster pelayanan",
    icon: CalendarPlus,
    fields: ["Bulan", "Tanggal ibadah", "Jenis ibadah", "Tema", "Nama pelayan per role"]
  },
  {
    title: "Chord lagu",
    icon: Music,
    fields: ["Judul", "Kategori", "Nomor lagu", "Tags", "Upload 1-2 gambar"]
  },
  {
    title: "Laporan keuangan",
    icon: FileUp,
    fields: ["Judul laporan", "Bulan", "Tahun", "Catatan", "Upload file"]
  },
  {
    title: "Persetujuan anggota",
    icon: UserCheck,
    fields: ["Nama", "Email", "Status approval", "Role admin/finance"]
  }
];

export function AdminForm() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {panels.map((panel) => {
        const Icon = panel.icon;
        return (
          <section key={panel.title} className="rounded border border-ink/10 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded bg-teal text-white">
                <Icon size={19} />
              </span>
              <h2 className="text-xl font-black text-ink">{panel.title}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {panel.fields.map((field) => (
                <label key={field} className="grid gap-1 text-sm font-bold text-ink/70">
                  {field}
                  <input className="focus-ring rounded border border-ink/15 bg-paper px-3 py-2 text-ink" placeholder={field} />
                </label>
              ))}
            </div>
            <button
              onClick={() => setSaved(true)}
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white"
            >
              <Save size={16} /> Simpan contoh
            </button>
          </section>
        );
      })}
      {saved ? (
        <p className="rounded border border-teal/25 bg-teal/10 p-4 text-sm font-bold text-teal lg:col-span-2">
          Demo tersimpan di tampilan lokal. Hubungkan Supabase untuk menyimpan data sungguhan.
        </p>
      ) : null}
    </div>
  );
}
