import { ServiceCard } from "@/components/service-card";
import { getServices } from "@/lib/data";

export default async function SchedulesPage() {
  const services = await getServices();
  const saturday = services.filter((service) => service.service_type === "saturday");
  const youth = services.filter((service) => service.service_type === "youth");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wide text-teal">Roster pelayanan</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Jadwal Naposo Bintara</h1>
        <p className="mt-3 text-ink/70">
          Roster bulanan untuk Ibadah Sabtu dan Ibadah Pemuda Minggu sore. Setiap nama bisa diperbarui dari area admin.
        </p>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-black text-ink">Ibadah Sabtu</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {saturday.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-black text-ink">Ibadah Pemuda Minggu</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {youth.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
