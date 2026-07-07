import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import GlassCard from '../../../components/common/GlassCard.jsx';
import Chip from '../../../components/common/Chip.jsx';
import Button from '../../../components/common/Button.jsx';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import { PageHeader } from '../../../components/app/ui.jsx';
import { getAllPilots, updatePilot } from '../../../services/admin.js';
import { useRanks } from '../../../context/RanksContext.jsx';

const inputCls =
  'rounded-lg border border-foam/15 bg-foam/5 px-3 py-2 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

function PilotRow({ pilot, onSaved }) {
  const { getRank } = useRanks();
  const [hours, setHours] = useState(pilot.hours ?? 0);
  const [points, setPoints] = useState(pilot.points ?? 0);
  const [role, setRole] = useState(pilot.role ?? 'pilot');
  const [saving, setSaving] = useState(false);

  const rank = getRank(Number(hours));

  const save = async () => {
    setSaving(true);
    const { error } = await updatePilot(pilot.id, {
      hours: Number(hours),
      points: Number(points),
      role,
    });
    setSaving(false);
    if (error) alert(`Erreur : ${error.message}`);
    onSaved();
  };

  return (
    <GlassCard className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4">
      <div className="min-w-[160px]">
        <p className="font-semibold">{pilot.first_name || 'Sans nom'}</p>
        <p className="font-mono text-xs text-foam/45">
          {pilot.callsign || '—'} {pilot.ivao_vid ? `· VID ${pilot.ivao_vid}` : ''}
        </p>
        {(pilot.simulator || pilot.experience) && (
          <p className="mt-0.5 text-[11px] text-foam/35">
            {pilot.simulator}
            {pilot.simulator && pilot.experience ? ' · ' : ''}
            {pilot.experience?.split(' — ')[0]}
          </p>
        )}
      </div>

      <Chip className="shrink-0" tone="lagoon">
        <span style={{ color: rank.color }}>{rank.icon} {rank.name}</span>
      </Chip>

      <div className="flex items-center gap-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-foam/40">H</label>
        <input type="number" step="0.1" min="0" value={hours} onChange={(e) => setHours(e.target.value)} className={`${inputCls} w-20`} />
      </div>

      <div className="flex items-center gap-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-foam/40">PTS</label>
        <input type="number" min="0" value={points} onChange={(e) => setPoints(e.target.value)} className={`${inputCls} w-20`} />
      </div>

      <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls}>
        <option value="pilot" className="bg-ocean">Pilote</option>
        <option value="staff" className="bg-ocean">Staff</option>
        <option value="admin" className="bg-ocean">Admin</option>
      </select>

      <Button size="sm" variant="glass" onClick={save} disabled={saving} className="ml-auto">
        <Save className="h-4 w-4" /> {saving ? '…' : 'Enregistrer'}
      </Button>
    </GlassCard>
  );
}

export default function StaffPilots() {
  useDocumentTitle('Pilotes & grades');
  const [pilots, setPilots] = useState(null);
  const load = () => getAllPilots().then(setPilots);
  useEffect(() => {
    load();
  }, []);

  if (!pilots) return <LoadingSpinner label="Chargement des pilotes…" />;

  return (
    <>
      <PageHeader
        title="Pilotes & grades"
        subtitle="Modifier les heures resynchronise automatiquement le grade. Staff/Admin donne accès à cette zone."
      />
      <div className="flex flex-col gap-3">
        {pilots.map((p) => (
          <PilotRow key={p.id} pilot={p} onSaved={load} />
        ))}
      </div>
    </>
  );
}
