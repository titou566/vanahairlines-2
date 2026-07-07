import { useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useRanks } from '../../context/RanksContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import Chip from '../../components/common/Chip.jsx';
import { PageHeader } from '../../components/app/ui.jsx';
import { getMyPireps } from '../../services/pireps.js';
import { computeBadges } from '../../utils/badges.js';

export default function Career() {
  useDocumentTitle('Ma carrière');
  const { user, profile } = useAuth();
  const { ranks, getRank, getNextRank, getRankProgress } = useRanks();
  const [pireps, setPireps] = useState([]);

  useEffect(() => {
    if (user) getMyPireps(user.id).then(setPireps);
  }, [user]);

  const hours = Number(profile?.hours ?? 0);
  const points = Number(profile?.points ?? 0);
  const current = getRank(hours);
  const next = getNextRank(hours);
  const progress = getRankProgress(hours);
  const badges = computeBadges({ hours, points, pireps });
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <>
      <PageHeader
        title="Ma carrière"
        subtitle="10 points par heure de vol approuvée. Chaque grade débloque de nouveaux horizons."
      >
        <Chip>
          <span style={{ color: current.color }}>{current.icon} {current.name}</span>
        </Chip>
      </PageHeader>

      {/* Progression actuelle */}
      <GlassCard className="mb-8 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-sm text-foam/60">
            {hours} h de vol · {points} points
          </p>
          {next ? (
            <span className="font-mono text-xs text-foam/50">
              Prochain grade : <span style={{ color: next.color }}>{next.icon} {next.name}</span> à {next.min_hours} h
            </span>
          ) : (
            <span className="font-mono text-xs text-sand">🌴 Grade maximum atteint !</span>
          )}
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-foam/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lagoon to-sunset transition-all duration-700"
            style={{ width: `${Math.max(3, progress * 100)}%` }}
          />
        </div>
      </GlassCard>

      {/* Badges */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Badges</h2>
          <span className="font-mono text-xs text-foam/45">
            {unlockedCount} / {badges.length} débloqués
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b) => (
            <GlassCard
              key={b.id}
              className={`flex items-center gap-4 px-5 py-4 ${b.unlocked ? 'border-sunset/30' : 'opacity-45 grayscale'}`}
            >
              <span className="text-3xl">{b.icon}</span>
              <div>
                <p className="text-sm font-semibold">{b.name}</p>
                <p className="text-xs text-foam/50">{b.desc}</p>
              </div>
              {b.unlocked && <span className="ml-auto font-mono text-xs text-lagoon-soft">✓</span>}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Échelle des grades */}
      <h2 className="mb-4 font-display text-xl font-bold">Échelle des grades</h2>
      <div className="flex flex-col gap-3">
        {ranks.map((rank) => {
          const reached = hours >= rank.min_hours;
          const isCurrent = rank.name === current.name;
          return (
            <GlassCard
              key={rank.name}
              className={`flex flex-wrap items-center gap-4 px-5 py-4 transition-all ${
                isCurrent ? 'border-lagoon/50 bg-lagoon/5' : reached ? '' : 'opacity-55'
              }`}
            >
              <span className="text-2xl">{rank.icon}</span>
              <div className="min-w-[180px]">
                <p className="font-display font-bold" style={{ color: rank.color }}>
                  {rank.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-foam/40">
                  {rank.min_hours === 0 ? 'Grade de départ' : `À partir de ${rank.min_hours} h`}
                </p>
              </div>
              <p className="flex-1 text-sm text-foam/55">{rank.perk}</p>
              {isCurrent && <Chip>Vous êtes ici</Chip>}
              {reached && !isCurrent && <span className="font-mono text-xs text-lagoon-soft">✓ Atteint</span>}
            </GlassCard>
          );
        })}
      </div>
    </>
  );
}
