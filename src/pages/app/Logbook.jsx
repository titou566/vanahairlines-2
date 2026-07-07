import { useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { PageHeader, StatusChip } from '../../components/app/ui.jsx';
import { getMyPireps } from '../../services/pireps.js';

export default function Logbook() {
  useDocumentTitle('Carnet de vol');
  const { user } = useAuth();
  const [pireps, setPireps] = useState(null);

  useEffect(() => {
    getMyPireps(user.id).then(setPireps);
  }, [user]);

  if (!pireps) return <LoadingSpinner label="Chargement du carnet…" />;

  return (
    <>
      <PageHeader title="Carnet de vol" subtitle={`${pireps.length} rapport(s) de vol enregistré(s).`} />

      {pireps.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-sm text-foam/50">Votre carnet de vol est vide pour le moment.</p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {pireps.map((p) => (
            <GlassCard key={p.id} className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4">
              <span className="font-mono text-sm text-lagoon-soft">{p.routes?.flight_number ?? '—'}</span>
              <span className="font-mono text-sm text-foam/80">
                {p.routes?.departure_icao} → {p.routes?.arrival_icao}
              </span>
              <span className="font-mono text-xs text-foam/45">{p.flight_date}</span>
              <span className="ml-auto flex items-center gap-3">
                <span className="font-mono text-xs text-sunset">{p.flight_time} h</span>
                <StatusChip status={p.status} />
              </span>
              {p.comments && <p className="w-full text-xs text-foam/40">{p.comments}</p>}
            </GlassCard>
          ))}
        </div>
      )}
    </>
  );
}
