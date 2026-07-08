import { Music, Save, Trash2 } from "lucide-react";
import { createSong, deleteSong, updateSong } from "@/app/admin/actions";
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
    <div className="grid gap-6">
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
            <textarea className={inputClass} name="image_urls" rows={3} placeholder="https://... kalau file sudah ada di tempat lain. Bisa satu URL per baris." />
          </Field>
        </div>
        <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
          <Save size={16} /> Simpan chord
        </button>
      </form>

      <section className="glass-panel rounded p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-ember">Edit chord tersimpan</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Update Entry Buku Ende</h2>
            <p className="mt-2 text-sm font-semibold text-graphite/65">
              {songs.length} chord tersimpan. Buka salah satu entry untuk memperbaiki judul, nomor, nada dasar, chord text, atau gambar.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {songs.map((song) => (
            <details key={song.id} className="rounded border border-ink/10 bg-white/75 p-4">
              <summary className="cursor-pointer text-base font-black text-ink">
                {song.song_number ? `No. ${song.song_number} - ` : ""}{song.title}
                <span className="ml-2 text-xs font-bold text-graphite/55">{song.original_key ? `Nada ${song.original_key}` : song.category}</span>
              </summary>
              <form action={updateSong} className="mt-4 grid gap-3">
                <input type="hidden" name="song_id" value={song.id} />
                <div className="grid gap-3 md:grid-cols-2">
                  <Field label="No">
                    <input className={inputClass} name="song_number" defaultValue={song.song_number} />
                  </Field>
                  <Field label="Judul">
                    <input className={inputClass} name="title" defaultValue={song.title} />
                  </Field>
                  <Field label="Kategori">
                    <input className={inputClass} name="category" defaultValue={song.category} />
                  </Field>
                  <Field label="Nada dasar original">
                    <input className={inputClass} name="original_key" defaultValue={song.original_key} />
                  </Field>
                </div>
                <Field label="Tags (pisahkan dengan koma)">
                  <input className={inputClass} name="tags" defaultValue={song.tags.join(", ")} />
                </Field>
                <Field label="Chord + lyrics text">
                  <textarea className={inputClass} name="chord_text" rows={8} defaultValue={song.chord_text} />
                </Field>
                <Field label="Gambar saat ini / URL gambar chord">
                  <textarea className={inputClass} name="image_urls" rows={Math.max(3, song.image_urls.length)} defaultValue={song.image_urls.join("\n")} />
                </Field>
                <Field label="Tambah upload gambar baru">
                  <input className={inputClass} name="image_files" type="file" accept="image/jpeg,image/png,image/webp" multiple />
                </Field>
                <button className="focus-ring inline-flex w-fit items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
                  <Save size={16} /> Update chord
                </button>
              </form>
              <form action={deleteSong} className="mt-3 rounded border border-ember/20 bg-ember/10 p-3">
                <input type="hidden" name="song_id" value={song.id} />
                <p className="text-xs font-bold text-ember/80">Hapus entry ini kalau chord sudah tidak dipakai atau salah upload.</p>
                <button className="focus-ring mt-2 inline-flex items-center gap-2 rounded bg-ember px-4 py-2 text-sm font-black text-white">
                  <Trash2 size={16} /> Delete chord
                </button>
              </form>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
