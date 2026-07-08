import { CalendarPlus, FileUp, Music, Save, Trash2, UserCheck } from "lucide-react";
import {
  createFinanceReport,
  createSong,
  createWeeklyAgenda,
  deleteWeeklyAgenda,
  updateProfileRoles,
  updateServiceRoster,
  updateWeeklyAgenda
} from "@/app/admin/actions";
import type { FinanceReport, Profile, Service, Song, WeeklyAgendaItem } from "@/lib/types";

type AdminFormProps = {
  agenda: WeeklyAgendaItem[];
  services: Service[];
  songs: Song[];
  reports: FinanceReport[];
  profiles: Profile[];
};

const saturdayRoles = ["Worship Leader", "Guitar", "Cajonist", "Pelean / Offering"];
const youthRoles = ["Singers", "Keyboard", "Guitar", "Bass", "Drums", "Media / Presenter"];

function toDatetimeLocal(value: string) {
  return value.slice(0, 16);
}

function roleValue(service: Service, role: string) {
  return service.assignments.find((item) => item.role === role)?.people.join(", ") ?? "";
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-bold text-graphite/70">
      {label}
      {children}
    </label>
  );
}

const inputClass = "focus-ring rounded border border-ink/15 bg-white px-3 py-2 text-ink";

export function AdminForm({ agenda, services, songs, reports, profiles }: AdminFormProps) {
  return (
    <div className="grid gap-6">
      <section className="glass-panel rounded p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-ink text-white">
            <CalendarPlus size={19} />
          </span>
          <h2 className="text-2xl font-black text-ink">Agenda mingguan</h2>
        </div>
        <form action={createWeeklyAgenda} className="mt-5 rounded border border-teal/20 bg-teal/5 p-4">
          <h3 className="text-lg font-black text-ink">Tambah agenda baru</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <Field label="Hari">
              <input className={inputClass} name="weekday" placeholder="Monday" />
            </Field>
            <Field label="Jam">
              <input className={inputClass} name="time" placeholder="19:00" />
            </Field>
            <Field label="Nama kegiatan">
              <input className={inputClass} name="title" placeholder="Latihan vokal" />
            </Field>
            <Field label="Lokasi">
              <input className={inputClass} name="location" placeholder="HKBP Bintara" />
            </Field>
            <Field label="Deskripsi">
              <textarea className={inputClass} name="description" rows={2} placeholder="Deskripsi singkat kegiatan" />
            </Field>
            <Field label="Warna">
              <select className={inputClass} name="accent" defaultValue="teal">
                <option value="teal">Teal</option>
                <option value="amber">Amber</option>
                <option value="rose">Rose</option>
                <option value="blue">Blue</option>
              </select>
            </Field>
          </div>
          <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-teal px-4 py-2 text-sm font-black text-white">
            <CalendarPlus size={16} /> Tambah agenda
          </button>
        </form>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {agenda.map((item) => (
            <div key={item.id} className="rounded border border-ink/10 bg-white/75 p-4">
              <form action={updateWeeklyAgenda}>
                <input type="hidden" name="id" value={item.id} />
                <div className="grid gap-3">
                  <Field label="Hari">
                    <input className={inputClass} name="weekday" defaultValue={item.weekday} />
                  </Field>
                  <Field label="Jam">
                    <input className={inputClass} name="time" defaultValue={item.time} />
                  </Field>
                  <Field label="Nama kegiatan">
                    <input className={inputClass} name="title" defaultValue={item.title} />
                  </Field>
                  <Field label="Lokasi">
                    <input className={inputClass} name="location" defaultValue={item.location} />
                  </Field>
                  <Field label="Deskripsi">
                    <textarea className={inputClass} name="description" defaultValue={item.description} rows={2} />
                  </Field>
                  <Field label="Warna">
                    <select className={inputClass} name="accent" defaultValue={item.accent}>
                      <option value="teal">Teal</option>
                      <option value="amber">Amber</option>
                      <option value="rose">Rose</option>
                      <option value="blue">Blue</option>
                    </select>
                  </Field>
                </div>
                <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
                  <Save size={16} /> Simpan agenda
                </button>
              </form>
              <form action={deleteWeeklyAgenda} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
                <button className="focus-ring inline-flex items-center gap-2 rounded border border-ember/20 bg-ember/10 px-4 py-2 text-sm font-black text-ember">
                  <Trash2 size={16} /> Hapus agenda
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-teal text-white">
            <CalendarPlus size={19} />
          </span>
          <h2 className="text-2xl font-black text-ink">Roster pelayanan minggu ini</h2>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {services.slice(0, 2).map((service) => {
            const roles = service.service_type === "saturday" ? saturdayRoles : youthRoles;
            return (
              <form key={service.id} action={updateServiceRoster} className="rounded border border-ink/10 bg-white/75 p-4">
                <input type="hidden" name="service_id" value={service.id} />
                <input type="hidden" name="service_type" value={service.service_type} />
                <div className="grid gap-3">
                  <Field label="Judul ibadah">
                    <input className={inputClass} name="title" defaultValue={service.title} />
                  </Field>
                  <Field label="Tema">
                    <input className={inputClass} name="theme" defaultValue={service.theme} />
                  </Field>
                  <Field label="Tanggal dan jam">
                    <input className={inputClass} type="datetime-local" name="service_date" defaultValue={toDatetimeLocal(service.service_date)} />
                  </Field>
                  {roles.map((role) => (
                    <Field key={role} label={`${role} (pisahkan nama dengan koma)`}>
                      <input className={inputClass} name={`role:${role}`} defaultValue={roleValue(service, role)} placeholder="Nama 1, Nama 2" />
                    </Field>
                  ))}
                </div>
                <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
                  <Save size={16} /> Simpan roster
                </button>
              </form>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form action={createSong} className="glass-panel rounded p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-ember text-white">
              <Music size={19} />
            </span>
            <h2 className="text-2xl font-black text-ink">Tambah chord</h2>
          </div>
          <div className="mt-5 grid gap-3">
            <Field label="Judul lagu">
              <input className={inputClass} name="title" placeholder="Buku Ende 356" />
            </Field>
            <Field label="Kategori">
              <input className={inputClass} name="category" placeholder="Buku Ende / Praise" />
            </Field>
            <Field label="Nomor lagu">
              <input className={inputClass} name="song_number" placeholder="356" />
            </Field>
            <Field label="Tags (pisahkan dengan koma)">
              <input className={inputClass} name="tags" placeholder="ende, ibadah, youth" />
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
          <p className="mt-4 text-sm font-semibold text-graphite/60">{songs.length} chord tersimpan.</p>
        </form>

        <form action={createFinanceReport} className="glass-panel rounded p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded bg-mango text-ink">
              <FileUp size={19} />
            </span>
            <h2 className="text-2xl font-black text-ink">Tambah laporan keuangan</h2>
          </div>
          <div className="mt-5 grid gap-3">
            <Field label="Judul laporan">
              <input className={inputClass} name="title" placeholder="Laporan Keuangan Juli 2026" />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Bulan">
                <input className={inputClass} name="month" type="number" min="1" max="12" placeholder="7" />
              </Field>
              <Field label="Tahun">
                <input className={inputClass} name="year" type="number" placeholder="2026" />
              </Field>
            </div>
            <Field label="URL file laporan">
              <input className={inputClass} name="file_url" placeholder="https://..." />
            </Field>
            <Field label="Catatan">
              <textarea className={inputClass} name="notes" rows={3} />
            </Field>
          </div>
          <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
            <Save size={16} /> Simpan laporan
          </button>
          <p className="mt-4 text-sm font-semibold text-graphite/60">{reports.length} laporan tersimpan.</p>
        </form>
      </section>

      <section className="glass-panel rounded p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-skydeep text-white">
            <UserCheck size={19} />
          </span>
          <h2 className="text-2xl font-black text-ink">Approval anggota dan role</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {profiles.map((profile) => (
            <form key={profile.id} action={updateProfileRoles} className="grid gap-3 rounded border border-ink/10 bg-white/75 p-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <input type="hidden" name="id" value={profile.id} />
              <div className="grid gap-3 md:grid-cols-[1.5fr_repeat(3,auto)] md:items-end">
                <Field label="Nama tampilan">
                  <input className={inputClass} name="display_name" defaultValue={profile.display_name} />
                </Field>
                <label className="flex items-center gap-2 rounded border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ink">
                  <input type="checkbox" name="is_approved" defaultChecked={profile.is_approved} /> Approved
                </label>
                <label className="flex items-center gap-2 rounded border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ink">
                  <input type="checkbox" name="is_admin" defaultChecked={profile.is_admin} /> Admin
                </label>
                <label className="flex items-center gap-2 rounded border border-ink/10 bg-white px-3 py-2 text-sm font-black text-ink">
                  <input type="checkbox" name="is_finance" defaultChecked={profile.is_finance} /> Finance
                </label>
              </div>
              <button className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-ink px-4 py-2 text-sm font-black text-white">
                <Save size={16} /> Simpan user
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
