import { useEffect, useState } from 'react';
import { Users, Clock, ClipboardList, Route as RouteIcon } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import GlassCard from '../../../components/common/GlassCard.jsx';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import { PageHeader } from '../../../components/app/ui.jsx';
import { getAllPilots, getAllRoutesAdmin, getApprovedPireps } from '../../../services/admin.js';

export default function StaffStats() {
  useDocumentTitle('Statistiques');
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([getAllPilots(), getAllRoutesAdmin(), getApprovedPireps()]).then(
      ([pilots, routes, pireps]) => setData({ pilots, routes, pireps })
    );
  }, []);

  if (!data) return <LoadingSpinner label="Calcul des statistiques…" />;

  const totalHours = data.pilots.reduce((s, p) => s + Number(p.hours ?? 0), 0);
  const totals = [
    { icon: Users, label: 'Pilotes inscrits', value: data.pilots.length },
    { icon: Clock, label: 'Heures compagnie', value: `${Math.round(totalHours * 10) / 10} h` },
    { icon: ClipboardList, label: 'Vols approuvés', value: data.pireps.length },
    { icon: RouteIcon, label: 'Routes actives', value: data.routes.filter((r) => r.active).length },
  ];

  // Répartition des heures par appareil
  const byAircraft = {};
  data.pireps.forEach((p) => {
    const code = p.routes?.aircraft_code ?? '???';
    byAircraft[code] = (byAircraft[code] ?? 0) + Number(p.flight_time ?? 0);
  });
  const aircraftRows = Object.entries(byAircraft).sort((a, b) => b[1] - a[1]);
  const maxHours = Math.max(1, ...aircraftRows.map(([, h]) => h));

  return (
    <>
      <PageHeader title="Statistiques compagnie" subtitle="Vue d'ensemble des opérations Lagoon Airways." />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {totals.map(({ icon: Icon, label, value }) => (
          <GlassCard key={label} className="flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lagoon/15">
              <Icon className="h-5 w-5 text-lagoon-soft" />
            </span>
            <div>
              <p className="font-display text-xl font-bold">{value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foam/45">{label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="font-display text-lg font-bold">Heures de vol par appareil</h3>
        {aircraftRows.length === 0 ? (
          <p className="mt-4 text-sm text-foam/50">Les statistiques apparaîtront après les premiers vols approuvés.</p>
        ) : (
          <div className="mt-5 flex flex-col gap-3">
            {aircraftRows.map(([code, hours]) => (
              <div key={code} className="flex items-center gap-4">
                <span className="w-14 shrink-0 font-mono text-sm text-foam/70">{code}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-foam/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-lagoon to-sunset transition-all duration-700"
                    style={{ width: `${(hours / maxHours) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-xs text-sunset">
                  {Math.round(hours * 10) / 10} h
                </span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </>
  );
}
