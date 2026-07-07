import GlassCard from '../common/GlassCard.jsx';
import Chip from '../common/Chip.jsx';

function Spec({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foam/40">{label}</span>
      <span className="font-mono text-sm text-foam/85">{value}</span>
    </div>
  );
}

export default function AircraftCard({ name, code, role, description, range, pax, cruise }) {
  return (
    <GlassCard hover className="flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold">{name}</h3>
          <p className="mt-1 text-sm text-lagoon-soft">{role}</p>
        </div>
        <Chip tone="neutral">{code}</Chip>
      </div>
      <p className="text-sm leading-relaxed text-foam/55">{description}</p>
      <div className="mt-auto grid grid-cols-3 gap-3 border-t border-foam/10 pt-4">
        <Spec label="Rayon" value={range} />
        <Spec label="Sièges" value={pax} />
        <Spec label="Croisière" value={cruise} />
      </div>
    </GlassCard>
  );
}
