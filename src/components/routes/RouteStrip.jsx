import { Plane } from 'lucide-react';
import Chip from '../common/Chip.jsx';

/** Ligne de route façon "flight strip" d'aéroport. */
export default function RouteStrip({ fn, dep, arr, aircraft, block }) {
  return (
    <div className="glass flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl px-5 py-4 transition-colors duration-200 hover:border-lagoon/40">
      <Chip className="shrink-0">{fn}</Chip>

      <div className="flex items-center gap-3 font-mono text-sm tracking-[0.12em]">
        <span className="text-foam">{dep}</span>
        <span className="flex items-center gap-1 text-lagoon" aria-hidden="true">
          <span className="hidden h-px w-6 bg-lagoon/40 sm:block" />
          <Plane className="h-4 w-4" />
          <span className="hidden h-px w-6 bg-lagoon/40 sm:block" />
        </span>
        <span className="text-foam">{arr}</span>
      </div>

      <div className="ml-auto flex items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-foam/50">
        <span>{aircraft}</span>
        <span className="text-sunset">{block}</span>
      </div>
    </div>
  );
}
