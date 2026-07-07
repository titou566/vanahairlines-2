import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Medal, ClipboardList, PlaneTakeoff, Megaphone, XCircle } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import Chip from '../../components/common/Chip.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { StatusChip, PageHeader } from '../../components/app/ui.jsx';
import { getMyPireps } from '../../services/pireps.js';
import { getMyBooking, cancelBooking } from '../../services/bookings.js';
import { getNews } from '../../services/news.js';
import { useRanks } from '../../context/RanksContext.jsx';

export default function DashboardHome() {
  useDocumentTitle('Tableau de bord');
  const { user, profile, refreshProfile } = useAuth();
  const { getRank, getNextRank, getRankProgress } = useRanks();

  const [pireps, setPireps] = useState(null);
  const [booking, setBooking] = useState(null);
  const [news, setNews] = useState([]);

  const load = () => {
    if (!user) return;
    Promise.all([getMyPireps(user.id), getMyBooking(user.id), getNews(5)]).then(
      ([reps, book, nws]) => {
        setPireps(reps);
        setBooking(book);
        setNews(nws);
      }
    );
  };

  useEffect(load, [user]);

  if (!pireps) return <LoadingSpinner label="Ouverture du cockpit…" />;

  const hours = Number(profile?.hours ?? 0);
  const points = Number(profile?.points ?? 0);
  const rank = getRank(hours);
  const nextRank = getNextRank(hours);
  const progress = getRankProgress(hours);

  const handleCancel = async () => {
    await cancelBooking(booking.id);
    load();
    refreshProfile();
  };

  return (
    <>
      <PageHeader
        title={`Bienvenue, ${profile?.first_name || 'pilote'} 👋`}
        subtitle="Votre centre d'opérations Lagoon Airways."
      >
        <Chip>
          <span style={{ color: rank.color }}>{rank.icon} {rank.name}</span>
        </Chip>
      </PageHeader>

      {/* Prochain vol */}
      <GlassCard className="mb-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunset/15">
              <PlaneTakeoff className="h-6 w-6 text-sunset" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foam/40">
                Prochain vol
              </p>
              {booking ? (
                <p className="mt-1 font-mono text-lg text-foam">
                  <span className="text-lagoon-soft">{booking.routes.flight_number}</span> ·{' '}
                  {booking.routes.departure_icao} → {booking.routes.arrival_icao} ·{' '}
                  <span className="text-foam/50">{booking.routes.aircraft_code} · {booking.routes.block_time}</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-foam/50">
                  Aucune réservation — choisissez votre prochaine destination ✈️
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {booking ? (
              <>
                <Button to="/app/pirep" size="sm">
                  Déposer le PIREP
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <XCircle className="h-4 w-4" /> Annuler
                </Button>
              </>
            ) : (
              <Button to="/app/reserver" variant="sunset" size="sm">
                Réserver un vol
              </Button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Clock, label: 'Heures de vol', value: `${hours} h` },
          { icon: Medal, label: 'Points carrière', value: points },
          { icon: ClipboardList, label: 'PIREPs soumis', value: pireps.length },
        ].map(({ icon: Icon, label, value }) => (
          <GlassCard key={label} className="flex items-center gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lagoon/15">
              <Icon className="h-5 w-5 text-lagoon-soft" />
            </span>
            <div>
              <p className="font-display text-xl font-bold">{value}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foam/45">{label}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Progression */}
      <GlassCard className="mb-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-lg font-bold">Progression de carrière</h3>
          {nextRank ? (
            <span className="font-mono text-xs text-foam/50">
              Prochain grade :{' '}
              <span style={{ color: nextRank.color }}>{nextRank.icon} {nextRank.name}</span> à{' '}
              {nextRank.min_hours} h
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
        {nextRank && (
          <p className="mt-2 text-right font-mono text-[11px] text-foam/40">
            {hours} h / {nextRank.min_hours} h
          </p>
        )}
      </GlassCard>

      {/* Derniers vols + Annonces */}
      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Derniers vols</h3>
            <Link to="/app/carnet" className="font-mono text-xs text-lagoon-soft hover:underline">
              Tout voir →
            </Link>
          </div>
          {pireps.length === 0 ? (
            <p className="mt-4 text-sm text-foam/50">Aucun PIREP pour l'instant.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              {pireps.slice(0, 4).map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-foam/10 px-4 py-3">
                  <span className="font-mono text-sm text-lagoon-soft">{p.routes?.flight_number ?? '—'}</span>
                  <span className="font-mono text-sm text-foam/70">
                    {p.routes?.departure_icao} → {p.routes?.arrival_icao}
                  </span>
                  <span className="ml-auto flex items-center gap-3">
                    <span className="font-mono text-xs text-foam/45">{p.flight_time} h</span>
                    <StatusChip status={p.status} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-sunset" />
            <h3 className="font-display text-lg font-bold">Annonces de la compagnie</h3>
          </div>
          {news.length === 0 ? (
            <p className="mt-4 text-sm text-foam/50">Aucune annonce pour le moment.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {news.map((n) => (
                <div key={n.id} className="rounded-xl border border-foam/10 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <span className="shrink-0 font-mono text-[10px] text-foam/35">
                      {new Date(n.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {n.content && <p className="mt-1 text-xs leading-relaxed text-foam/55">{n.content}</p>}
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </>
  );
}
