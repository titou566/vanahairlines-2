import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import GlassCard from '../../../components/common/GlassCard.jsx';
import Button from '../../../components/common/Button.jsx';
import { PageHeader } from '../../../components/app/ui.jsx';
import { useRanks } from '../../../context/RanksContext.jsx';
import { addRank, updateRank, deleteRank } from '../../../services/ranks.js';

const inputCls =
  'rounded-lg border border-foam/15 bg-foam/5 px-3 py-2 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

function RankRow({ rank, onChanged }) {
  const [form, setForm] = useState({ ...rank });
  const [saving, setSaving] = useState(false);

  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const save = async () => {
    setSaving(true);
    const { error } = await updateRank(rank.id, {
      name: form.name,
      min_hours: Number(form.min_hours),
      color: form.color,
      icon: form.icon,
      perk: form.perk,
    });
    setSaving(false);
    if (error) alert(`Erreur : ${error.message}`);
    onChanged();
  };

  const remove = async () => {
    if (!confirm(`Supprimer le grade « ${rank.name} » ?`)) return;
    const { error } = await deleteRank(rank.id);
    if (error) alert(`Erreur : ${error.message}`);
    onChanged();
  };

  return (
    <GlassCard className="flex flex-wrap items-center gap-3 px-5 py-4">
      <input value={form.icon} onChange={set('icon')} className={`${inputCls} w-14 text-center`} aria-label="Icône" />
      <input value={form.name} onChange={set('name')} className={`${inputCls} w-52`} aria-label="Nom du grade" />
      <div className="flex items-center gap-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-foam/40">Dès</label>
        <input type="number" min="0" value={form.min_hours} onChange={set('min_hours')} className={`${inputCls} w-20`} />
        <span className="font-mono text-[10px] text-foam/40">h</span>
      </div>
      <input type="color" value={form.color} onChange={set('color')} className="h-9 w-12 cursor-pointer rounded-lg border border-foam/15 bg-transparent" aria-label="Couleur" />
      <input value={form.perk ?? ''} onChange={set('perk')} className={`${inputCls} min-w-[220px] flex-1`} placeholder="Avantage débloqué…" aria-label="Avantage" />
      <div className="ml-auto flex gap-2">
        <Button size="sm" variant="glass" onClick={save} disabled={saving}>
          <Save className="h-4 w-4" /> {saving ? '…' : 'Enregistrer'}
        </Button>
        <button onClick={remove} className="rounded-lg p-2 text-foam/40 transition-colors hover:bg-coral/10 hover:text-coral" aria-label="Supprimer">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </GlassCard>
  );
}

export default function StaffRanks() {
  useDocumentTitle('Grades');
  const { ranks, reload } = useRanks();
  const [adding, setAdding] = useState(false);

  const hasIds = ranks.every((r) => r.id != null);

  const addNew = async () => {
    setAdding(true);
    const { error } = await addRank({
      name: 'Nouveau grade',
      min_hours: 500,
      color: '#7FE0D6',
      icon: '🎖️',
      perk: '',
    });
    setAdding(false);
    if (error) alert(`Erreur : ${error.message}`);
    reload();
  };

  return (
    <>
      <PageHeader
        title="Grades configurables"
        subtitle="Noms, seuils d'heures, couleurs, icônes et avantages — appliqués instantanément à toute la compagnie."
      >
        <Button size="sm" onClick={addNew} disabled={adding || !hasIds}>
          <Plus className="h-4 w-4" /> Ajouter un grade
        </Button>
      </PageHeader>

      {!hasIds ? (
        <GlassCard className="p-6">
          <p className="text-sm text-foam/60">
            ⚠️ La table <code>ranks</code> n'existe pas encore dans Supabase — les grades affichés
            sont les valeurs par défaut. Exécutez le script SQL fourni pour activer la
            configuration.
          </p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {ranks.map((r) => (
            <RankRow key={r.id} rank={r} onChanged={reload} />
          ))}
        </div>
      )}
    </>
  );
}
