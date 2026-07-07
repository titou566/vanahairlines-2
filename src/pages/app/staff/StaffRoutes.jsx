import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import GlassCard from '../../../components/common/GlassCard.jsx';
import Button from '../../../components/common/Button.jsx';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import { PageHeader } from '../../../components/app/ui.jsx';
import { getAllRoutesAdmin, addRoute, toggleRoute } from '../../../services/admin.js';

const inputCls =
  'rounded-lg border border-foam/15 bg-foam/5 px-3 py-2 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

export default function StaffRoutes() {
  useDocumentTitle('Gestion des routes');
  const [routes, setRoutes] = useState(null);
  const [form, setForm] = useState({ flight_number: '', departure_icao: '', arrival_icao: '', aircraft_code: '', block_time: '' });
  const [adding, setAdding] = useState(false);

  const load = () => getAllRoutesAdmin().then(setRoutes);
  useEffect(() => {
    load();
  }, []);

  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value.toUpperCase() });

  const add = async () => {
    setAdding(true);
    const { error } = await addRoute(form);
    setAdding(false);
    if (error) {
      alert(`Erreur : ${error.message}`);
      return;
    }
    setForm({ flight_number: '', departure_icao: '', arrival_icao: '', aircraft_code: '', block_time: '' });
    load();
  };

  const toggle = async (r) => {
    await toggleRoute(r.id, !r.active);
    load();
  };

  if (!routes) return <LoadingSpinner label="Chargement des routes…" />;

  return (
    <>
      <PageHeader title="Gestion des routes" subtitle="Ajoutez ou désactivez des routes sans toucher au code." />

      <GlassCard className="mb-5 p-5">
        <h3 className="mb-4 font-display font-bold">Ajouter une route</h3>
        <div className="flex flex-wrap gap-3">
          <input placeholder="LGN400" value={form.flight_number} onChange={update('flight_number')} className={`${inputCls} w-24`} />
          <input placeholder="LFPG" value={form.departure_icao} onChange={update('departure_icao')} className={`${inputCls} w-20`} maxLength={4} />
          <input placeholder="NTAA" value={form.arrival_icao} onChange={update('arrival_icao')} className={`${inputCls} w-20`} maxLength={4} />
          <input placeholder="A339" value={form.aircraft_code} onChange={update('aircraft_code')} className={`${inputCls} w-20`} maxLength={4} />
          <input placeholder="11:05" value={form.block_time} onChange={update('block_time')} className={`${inputCls} w-20`} />
          <Button size="sm" onClick={add} disabled={adding || !form.flight_number || !form.departure_icao || !form.arrival_icao}>
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>
        <p className="mt-3 text-xs text-foam/40">
          ⚠️ Le code appareil doit exister dans la flotte (A20N, A339, A359, AT76, B38M, B789). Pour la carte,
          les nouveaux aéroports doivent être ajoutés dans <code>src/utils/airports.js</code>.
        </p>
      </GlassCard>

      <div className="flex flex-col gap-2">
        {routes.map((r) => (
          <GlassCard key={r.id} className={`flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 ${!r.active ? 'opacity-45' : ''}`}>
            <span className="font-mono text-sm text-lagoon-soft">{r.flight_number}</span>
            <span className="font-mono text-sm text-foam/75">
              {r.departure_icao} → {r.arrival_icao}
            </span>
            <span className="font-mono text-xs text-foam/45">{r.aircraft_code} · {r.block_time}</span>
            <Button size="sm" variant="ghost" onClick={() => toggle(r)} className="ml-auto">
              {r.active ? 'Désactiver' : 'Réactiver'}
            </Button>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
