import { useEffect, useState } from 'react';
import { Plane, CalendarCheck, XCircle } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import Chip from '../../components/common/Chip.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { PageHeader } from '../../components/app/ui.jsx';
import { getBookableRoutes, getMyBooking, bookRoute, cancelBooking } from '../../services/bookings.js';

export default function BookFlight() {
  useDocumentTitle('Réserver un vol');
  const { user } = useAuth();
  const [routes, setRoutes] = useState(null);
  const [booking, setBooking] = useState(null);
  const [busy, setBusy] = useState(null);

  const load = () => {
    Promise.all([getBookableRoutes(), getMyBooking(user.id)]).then(([r, b]) => {
      setRoutes(r);
      setBooking(b);
    });
  };
  useEffect(load, [user]);

  const handleBook = async (routeId) => {
    setBusy(routeId);
    const { error } = await bookRoute(user.id, routeId);
    setBusy(null);
    if (error) alert(`Erreur : ${error.message}`);
    load();
  };

  const handleCancel = async () => {
    await cancelBooking(booking.id);
    load();
  };

  if (!routes) return <LoadingSpinner label="Chargement des routes…" />;

  return (
    <>
      <PageHeader
        title="Réserver un vol"
        subtitle="Choisissez votre route : elle deviendra votre « prochain vol » et pré-remplira votre PIREP."
      />

      {booking && (
        <GlassCard className="mb-6 flex flex-wrap items-center justify-between gap-4 border-lagoon/40 p-5">
          <div className="flex items-center gap-3">
            <CalendarCheck className="h-5 w-5 text-lagoon" />
            <p className="font-mono text-sm">
              Réservation active :{' '}
              <span className="text-lagoon-soft">{booking.routes.flight_number}</span> ·{' '}
              {booking.routes.departure_icao} → {booking.routes.arrival_icao}
            </p>
          </div>
          <div className="flex gap-2">
            <Button to="/app/pirep" size="sm">Déposer le PIREP</Button>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <XCircle className="h-4 w-4" /> Annuler
            </Button>
          </div>
        </GlassCard>
      )}

      <div className="flex flex-col gap-3">
        {routes.map((r) => (
          <GlassCard key={r.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
            <Chip className="shrink-0">{r.flight_number}</Chip>
            <div className="flex items-center gap-3 font-mono text-sm tracking-[0.12em]">
              <span>{r.departure_icao}</span>
              <Plane className="h-4 w-4 text-lagoon" aria-hidden="true" />
              <span>{r.arrival_icao}</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-foam/45">
              {r.aircraft_code} · <span className="text-sunset">{r.block_time}</span>
            </span>
            <div className="ml-auto">
              <Button
                size="sm"
                variant={booking ? 'ghost' : 'primary'}
                disabled={Boolean(booking) || busy === r.id}
                onClick={() => handleBook(r.id)}
              >
                {busy === r.id ? '…' : booking ? 'Déjà réservé' : 'Réserver'}
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
