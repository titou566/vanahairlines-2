import { useEffect, useState } from 'react';
import GlassCard from '../common/GlassCard.jsx';
import Chip from '../common/Chip.jsx';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../../services/pilots.js';
import { useRanks } from '../../context/RanksContext.jsx';

const MEDALS = ['🥇', '🥈', '🥉'];

/** Classement des pilotes par points — utilisé sur le site public et dans LagoonOS. */
export default function LeaderboardTable() {
  const [pilots, setPilots] = useState(null);
  const { getRank } = useRanks();

  useEffect(() => {
    getLeaderboard().then(setPilots);
  }, []);

  if (!pilots) return <LoadingSpinner label="Chargement du classement…" />;

  if (pilots.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <p className="text-sm text-foam/50">
          Le classement s'affichera dès les premiers vols approuvés ✈️
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* En-têtes */}
      <div className="grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foam/35 sm:grid-cols-[2.5rem_1fr_8rem_5rem_5rem]">
        <span>#</span>
        <span>Pilote</span>
        <span className="hidden sm:block">Grade</span>
        <span className="text-right">Heures</span>
        <span className="text-right">Points</span>
      </div>

      {pilots.map((p, i) => {
        const rank = getRank(Number(p.hours ?? 0));
        return (
          <GlassCard
            key={p.id}
            className={`grid grid-cols-[2.5rem_1fr_auto_auto] items-center gap-4 px-5 py-3.5 sm:grid-cols-[2.5rem_1fr_8rem_5rem_5rem] ${
              i < 3 ? 'border-sunset/25' : ''
            }`}
          >
            <span className="font-display text-lg font-bold text-foam/60">
              {MEDALS[i] ?? i + 1}
            </span>
            <div className="min-w-0">
              {p.callsign ? (
                <Link to={`/pilote/${p.callsign}`} className="truncate text-sm font-semibold transition-colors hover:text-lagoon-soft">
                  {p.first_name || 'Pilote Lagoon'}
                </Link>
              ) : (
                <p className="truncate text-sm font-semibold">{p.first_name || 'Pilote Lagoon'}</p>
              )}
              <p className="font-mono text-[10px] text-foam/40">{p.callsign || '—'}</p>
            </div>
            <span className="hidden sm:block">
              <Chip tone="neutral">
                <span style={{ color: rank.color }}>{rank.icon} {rank.name}</span>
              </Chip>
            </span>
            <span className="text-right font-mono text-sm text-foam/70">{p.hours} h</span>
            <span className="text-right font-mono text-sm font-semibold text-sunset">{p.points}</span>
          </GlassCard>
        );
      })}
    </div>
  );
}
