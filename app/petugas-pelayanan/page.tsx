import Link from "next/link";
import { ArrowRight, CalendarCheck2, Music2 } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { getUpcomingServices } from "@/lib/data";

export default async function PetugasPelayananPage() {
  const services = await getUpcomingServices(6);

  return (
    <main className="section-shell">
      <section className="church-card overflow-hidden">
        <div className="photo-panel min-h-80 p-7 md:p-9">
          <div className="max-w-3xl">
            <p className="eyebrow text-mango">Roster pelayanan</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none text-white sm:text-7xl">Petugas Pelayanan</h1>
            <p className="mt-4 max-w-2xl text-lg font-bold leading-8 text-white/75">
              Jadwal pelayan PHD Sabtu dan Ibadah Minggu Sore, termasuk pembicara, tim musik, multimedia, dan nyanyian rohani.
            </p>
          </div>
          <Link href="/chords" className="church-button-light mt-8 w-fit">
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
            <h2 className="text-4xl font-black uppercase leading-none text-ink">Pelayanan Terdekat</h2>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="church-card flex flex-col justify-between gap-4 bg-ink p-7 text-white md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-teal">Google Sheet</p>
            <h2 className="mt-2 text-3xl font-black uppercase leading-none">Roster ini bisa mengikuti spreadsheet bulanan.</h2>
          </div>
          <Link href="/admin" className="church-button-light w-fit">
            Admin <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
