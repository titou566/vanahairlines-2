import { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import useUtcClock from '../../hooks/useUtcClock.js';

const FLIGHTS = [
  { fn: 'LGN001', dep: 'LFPG', arr: 'FMEE', ac: 'A339' },
  { fn: 'LGN301', dep: 'NTAA', arr: 'NWWW', ac: 'A359' },
  { fn: 'LGN210', dep: 'TFFR', arr: 'KMIA', ac: 'B38M' },
  { fn: 'LGN203', dep: 'TFFR', arr: 'TFFF', ac: 'AT76' },
  { fn: 'LGN115', dep: 'FMEE', arr: 'FMMI', ac: 'B38M' },
];

const STATUSES = [
  { label: 'BOARDING', color: 'text-lagoon-soft' },
  { label: 'TAXI OUT', color: 'text-sand' },
  { label: 'EN ROUTE', color: 'text-lagoon' },
  { label: 'APPROACH', color: 'text-sunset' },
  { label: 'LANDED', color: 'text-foam/50' },
];

/** Tableau des départs façon OPS vAMSYS — la pièce maîtresse du hero. */
export default function DeparturesBoard() {
  const clock = useUtcClock();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-strong overflow-hidden rounded-3xl border border-foam/10">
      {/* En-tête OPS */}
      <div className="flex items-center justify-between border-b border-foam/10 px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-lagoon-soft">
          <Radio className="h-3.5 w-3.5" />
          Lagoon OPS · Départs
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-foam/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lagoon" />
          {clock} Z
        </span>
      </div>

      {/* Colonnes */}
      <div className="grid grid-cols-[1fr_1.2fr_0.8fr_1fr] gap-2 border-b border-foam/10 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foam/35 sm:grid-cols-[1fr_1.4fr_0.8fr_1.1fr]">
        <span>Vol</span>
        <span>Trajet</span>
        <span>Type</span>
        <span className="text-right">Statut</span>
      </div>

      {/* Lignes */}
      <div className="flex flex-col">
        {FLIGHTS.map((f, i) => {
          const status = STATUSES[(i + tick) % STATUSES.length];
          return (
            <div
              key={f.fn}
              className="grid grid-cols-[1fr_1.2fr_0.8fr_1fr] items-center gap-2 border-b border-foam/5 px-5 py-3 font-mono text-xs transition-colors hover:bg-foam/5 sm:grid-cols-[1fr_1.4fr_0.8fr_1.1fr] sm:text-sm"
            >
              <span className="text-lagoon-soft">{f.fn}</span>
              <span className="text-foam/80">
                {f.dep} <span className="text-foam/30">→</span> {f.arr}
              </span>
              <span className="text-foam/45">{f.ac}</span>
              <span key={status.label} className={`animate-strip text-right text-[10px] uppercase tracking-[0.15em] sm:text-xs ${status.color}`}>
                {status.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-2.5 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-foam/25">
        Réseau IVAO · Simulation uniquement
      </div>
    </div>
  );
}
