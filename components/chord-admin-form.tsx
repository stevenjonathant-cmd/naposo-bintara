import { Music, Save } from "lucide-react";
import { createSong } from "@/app/admin/actions";
import type { Song } from "@/lib/types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-graphite/70">
      {label}
      {children}
    </label>
  );
}

const inputClass = "focus-ring rounded border border-ink/15 bg-white px-3 py-2 text-ink";

export function ChordAdminForm({ songs }: { songs: Song[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form action={createSong} className="glass-panel rounded p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-ember text-white">
            <Music size={19} />
          </span>
          <h2 className="text-2xl font-black text-ink">Tambah Buku Ende Chord</h2>
        </div>
        <div className="mt-5 grid gap-3">
          <Field label="No">
            <input className={inputClass} name="song_number" placeholder="356" />
          </Field>
          <Field label="Judul">
            <input className={inputClass} name="title" placeholder="Sai Tong Ingotonku" />
          </Field>
          <Field label="Kategori">
            <input className={inputClass} name="category" placeholder="Buku Ende / Praise" />
          </Field>
          <Field label="Nada dasar original">
            <input className={inputClass} name="original_key" placeholder="G / C / D / F#" />
          </Field>
          <Field label="Tags (pisahkan dengan koma)">
            <input className={inputClass} name="tags" placeholder="ende, ibadah, youth" />
          </Field>
          <Field label="Chord + lyrics text (opsional, bisa ditranspose)">
            <textarea className={inputClass} name="chord_text" rows={8} placeholder={"G        D/F#       Em\nSai tong ingotonku...\nC        G/B        Am    D"} />
          </Field>
          <Field label="Upload gambar chord">
            <input className={inputClass} name="image_files" type="file" accept="image/jpeg,image/png,image/webp" multiple />
          </Field>
          <Field label="URL gambar chord cadangan (opsional)">
            <textarea className={inputClass} name="image_urls" rows={3} placeholder="https://... kalau file sudah ada di tempat lain" />
          </Field>
        </div>
        <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
          <Save size={16} /> Simpan chord
        </button>
      </form>

      <aside className="glass-panel rounded p-5">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Database chord</p>
        <p className="mt-3 text-5xl font-black text-ink">{songs.length}</p>
        <p className="mt-2 text-sm font-semibold text-graphite/65">chord tersimpan dan tampil di halaman Buku Ende Chords.</p>
        <div className="mt-5 grid gap-3">
          {songs.slice(0, 8).map((song) => (
            <div key={song.id} className="rounded border border-ink/10 bg-white/75 p-3">
              <p className="text-sm font-black text-ink">{song.song_number ? `No. ${song.song_number} - ` : ""}{song.title}</p>
              <p className="mt-1 text-xs font-semibold text-graphite/60">{song.original_key ? `Nada dasar: ${song.original_key}` : song.category}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
