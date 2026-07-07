import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import GlassCard from '../components/common/GlassCard.jsx';
import Chip from '../components/common/Chip.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { getLeaderboard } from '../services/pilots.js';
import { useRanks } from '../context/RanksContext.jsx';
import { computeBadges } from '../utils/badges.js';

/** Profil public d'un pilote — accessible via /pilote/:callsign. */
export default function PublicProfile() {
  const { callsign } = useParams();
  const { getRank, getNextRank, getRankProgress } = useRanks();
  const [pilot, setPilot] = useState(undefined);

  useDocumentTitle(callsign ? `Pilote ${callsign}` : 'Pilote');

  useEffect(() => {
    getLeaderboard().then((all) => {
      setPilot(all.find((p) => p.callsign?.toUpperCase() === callsign?.toUpperCase()) ?? null);
    });
  }, [callsign]);

  if (pilot === undefined) return <div className="pt-36"><LoadingSpinner label="Recherche du pilote…" /></div>;

  if (pilot === null) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 pt-24 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-sunset">Pilote introuvable</p>
        <h1 className="font-display text-3xl font-bold">Aucun pilote « {callsign} »</h1>
        <Link to="/classement" className="text-sm text-lagoon-soft hover:underline">← Retour au classement</Link>
      </section>
    );
  }

  const hours = Number(pilot.hours ?? 0);
  const rank = getRank(hours);
  const next = getNextRank(hours);
  const progress = getRankProgress(hours);
  const badges = computeBadges({ hours, points: pilot.points }).filter((b) => b.unlocked);

  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <GlassCard className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-lagoon to-sunset font-display text-3xl font-bold text-abyss">
            {(pilot.first_name || pilot.callsign || '?').slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-3xl font-bold">{pilot.first_name || 'Pilote Lagoon'}</h1>
            <p className="mt-1 font-mono text-sm text-foam/50">{pilot.callsign}</p>
          </div>
          <Chip>
            <span style={{ color: rank.color }}>{rank.icon} {rank.name}</span>
          </Chip>

          <div className="mt-2 grid w-full grid-cols-2 gap-4">
            <div className="rounded-2xl border border-foam/10 p-4">
              <p className="font-display text-2xl font-bold">{hours} h</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foam/45">Heures de vol</p>
            </div>
            <div className="rounded-2xl border border-foam/10 p-4">
              <p className="font-display text-2xl font-bold text-sunset">{pilot.points}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foam/45">Points carrière</p>
            </div>
          </div>

          <div className="w-full">
            <div className="h-2.5 overflow-hidden rounded-full bg-foam/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lagoon to-sunset"
                style={{ width: `${Math.max(3, progress * 100)}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-[10px] text-foam/40">
              {next ? `${hours} h / ${next.min_hours} h vers ${next.name}` : 'Grade maximum atteint 🌴'}
            </p>
          </div>

          {badges.length > 0 && (
            <div className="mt-2 w-full">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foam/40">
                Badges
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {badges.map((b) => (
                  <span key={b.id} title={b.desc} className="glass rounded-full px-3 py-1.5 text-sm">
                    {b.icon} <span className="text-xs text-foam/70">{b.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
