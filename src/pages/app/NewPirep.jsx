import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { useAuth } from '../../context/AuthContext.jsx';
import GlassCard from '../../components/common/GlassCard.jsx';
import Button from '../../components/common/Button.jsx';
import { PageHeader, inputCls, labelCls } from '../../components/app/ui.jsx';
import { submitPirep, getRoutesForPirep } from '../../services/pireps.js';
import { getMyBooking, markBookingFlown } from '../../services/bookings.js';

export default function NewPirep() {
  useDocumentTitle('Nouveau PIREP');
  const { user, refreshProfile } = useAuth();

  const [routes, setRoutes] = useState([]);
  const [booking, setBooking] = useState(null);
  const [routeId, setRouteId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('');
  const [comments, setComments] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getRoutesForPirep(), getMyBooking(user.id)]).then(([r, b]) => {
      setRoutes(r);
      setBooking(b);
      if (b) setRouteId(String(b.route_id)); // Pré-remplissage depuis la réservation
    });
  }, [user]);

  const handleSubmit = async () => {
    setStatus({ type: '', message: '' });
    setSubmitting(true);
    const { error } = await submitPirep({
      pilotId: user.id,
      routeId: Number(routeId),
      flightDate: date,
      flightTime: Number(time),
      comments,
    });

    // Si le PIREP correspond à la réservation active, on la clôture
    if (!error && booking && Number(routeId) === booking.route_id) {
      await markBookingFlown(booking.id);
      setBooking(null);
    }

    setSubmitting(false);
    if (error) {
      setStatus({ type: 'error', message: error.message });
      return;
    }
    setStatus({
      type: 'success',
      message: 'PIREP soumis ! Heures et points seront crédités à l\'approbation par le staff.',
    });
    setRouteId('');
    setTime('');
    setComments('');
    refreshProfile();
  };

  return (
    <>
      <PageHeader
        title="Nouveau PIREP"
        subtitle="Après chaque vol effectué sur IVAO avec le callsign de la route. 10 points carrière par heure approuvée."
      />

      <GlassCard className="max-w-2xl p-6">
        {booking && (
          <p className="mb-5 rounded-xl border border-lagoon/30 bg-lagoon/10 px-4 py-3 font-mono text-xs text-lagoon-soft">
            ✈️ Pré-rempli depuis votre réservation : {booking.routes.flight_number} ·{' '}
            {booking.routes.departure_icao} → {booking.routes.arrival_icao}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Route</label>
            <select value={routeId} onChange={(e) => setRouteId(e.target.value)} className={inputCls}>
              <option value="" className="bg-ocean">— Choisir une route —</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id} className="bg-ocean">
                  {r.flight_number} · {r.departure_icao} → {r.arrival_icao} ({r.block_time})
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Date du vol</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Temps de vol (heures)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                placeholder="Ex : 1.5 pour 1h30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Commentaires (optionnel)</label>
            <textarea
              rows={3}
              placeholder="Conditions du vol, remarques..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className={`${inputCls} resize-none`}
            />
          </div>

          {status.message && (
            <p className={`text-sm ${status.type === 'error' ? 'text-coral' : 'text-lagoon-soft'}`}>
              {status.message}
            </p>
          )}

          <Button onClick={handleSubmit} disabled={!routeId || !time || submitting}>
            <Send className="h-4 w-4" />
            {submitting ? 'Envoi…' : 'Soumettre le PIREP'}
          </Button>
        </div>
      </GlassCard>
    </>
  );
}
