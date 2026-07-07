import Chip from '../common/Chip.jsx';

export const inputCls =
  'w-full rounded-xl border border-foam/15 bg-foam/5 px-4 py-3 text-sm text-foam placeholder:text-foam/30 transition-colors focus:border-lagoon/60 focus:outline-none';

export const labelCls =
  'mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-foam/45';

const STATUS = {
  pending: { label: 'En attente', tone: 'sunset' },
  approved: { label: 'Approuvé', tone: 'lagoon' },
  rejected: { label: 'Refusé', tone: 'neutral' },
  active: { label: 'Réservé', tone: 'lagoon' },
  flown: { label: 'Effectué', tone: 'neutral' },
  cancelled: { label: 'Annulé', tone: 'neutral' },
};

export function StatusChip({ status }) {
  const s = STATUS[status] ?? STATUS.pending;
  return <Chip tone={s.tone}>{s.label}</Chip>;
}

/** En-tête standard des pages de l'app. */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-foam/50">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
