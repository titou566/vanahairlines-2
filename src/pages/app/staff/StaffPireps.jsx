import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import GlassCard from '../../../components/common/GlassCard.jsx';
import Button from '../../../components/common/Button.jsx';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import { PageHeader } from '../../../components/app/ui.jsx';
import { getPendingPireps, approvePirep, rejectPirep } from '../../../services/admin.js';

export default function StaffPireps() {
  useDocumentTitle('Validation PIREPs');
  const [pireps, setPireps] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = () => getPendingPireps().then(setPireps);
  useEffect(() => {
    load();
  }, []);

  const handle = async (action, pirep) => {
    setBusy(pirep.id);
    const { error } = action === 'approve' ? await approvePirep(pirep) : await rejectPirep(pirep);
    setBusy(null);
    if (error) alert(`Erreur : ${error.message}`);
    load();
  };

  if (!pireps) return <LoadingSpinner label="Chargement des PIREPs…" />;

  return (
    <>
      <PageHeader
        title="Validation des PIREPs"
        subtitle="Approuver crédite automatiquement heures, points et grade au pilote."
      />

      {pireps.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <p className="text-sm text-foam/50">✅ Aucun PIREP en attente — tout est à jour.</p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {pireps.map((p) => (
            <GlassCard key={p.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-sm text-lagoon-soft">
                  {p.routes?.flight_number} · {p.routes?.departure_icao} → {p.routes?.arrival_icao}
                </p>
                <p className="mt-1 text-xs text-foam/50">
                  {p.pilots?.first_name || 'Pilote'} {p.pilots?.callsign ? `(${p.pilots.callsign})` : ''}
                  {p.pilots?.ivao_vid ? ` · VID ${p.pilots.ivao_vid}` : ''} — {p.flight_date} ·{' '}
                  <span className="text-sunset">{p.flight_time} h</span>
                </p>
                {p.comments && <p className="mt-1 text-xs italic text-foam/40">« {p.comments} »</p>}
              </div>
              <div className="ml-auto flex gap-2">
                <Button size="sm" onClick={() => handle('approve', p)} disabled={busy === p.id}>
                  <Check className="h-4 w-4" /> Approuver
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handle('reject', p)} disabled={busy === p.id}>
                  <X className="h-4 w-4" /> Refuser
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </>
  );
}
