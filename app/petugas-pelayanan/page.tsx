import Link from "next/link";
import { ArrowRight, CalendarCheck2, Music2 } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { getUpcomingServices } from "@/lib/data";

export default async function PetugasPelayananPage() {
  const services = await getUpcomingServices(6);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel overflow-hidden rounded">
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end lg:p-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-teal">Roster pelayanan</p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-ink sm:text-5xl">Petugas Pelayanan</h1>
            <p className="mt-4 text-lg font-semibold leading-8 text-graphite/70">
              Jadwal pelayan PHD Sabtu dan Ibadah Minggu Sore, termasuk pembicara, tim musik, multimedia, dan nyanyian rohani.
            </p>
          </div>
          <Link href="/chords" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-black text-white">
            Buka Chord <Music2 size={17} />
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-white">
            <CalendarCheck2 size={20} />
          </span>
          <div>
            <p className="eyebrow text-ember">Upcoming</p>
            <h2 className="text-3xl font-black text-ink">Pelayanan Terdekat</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="glass-panel flex flex-col justify-between gap-4 rounded p-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-teal">Google Sheet</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Roster ini bisa mengikuti spreadsheet bulanan.</h2>
          </div>
          <Link href="/admin" className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-black text-ink">
            Admin <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
