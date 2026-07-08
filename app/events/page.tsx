import { EventList } from "@/components/event-list";
import { getEvents } from "@/lib/data";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-wide text-ember">Agenda</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Acara dan Kegiatan</h1>
        <p className="mt-3 text-ink/70">Info kegiatan bulan ini dan rencana pelayanan berikutnya.</p>
      </div>
      <div className="mt-8">
        <EventList events={events} />
      </div>
    </main>
  );
}
