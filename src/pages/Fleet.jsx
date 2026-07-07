import { useEffect, useMemo, useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import AircraftCard from '../components/fleet/AircraftCard.jsx';
import { getFleet } from '../services/flights.js';

const FILTERS = ['Tous', 'Airbus', 'Boeing', 'ATR'];

export default function Fleet() {
  useDocumentTitle('Flotte');
  const [filter, setFilter] = useState('Tous');
  const [fleet, setFleet] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getFleet().then((data) => {
      if (!cancelled) setFleet(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (!fleet ? [] : filter === 'Tous' ? fleet : fleet.filter((a) => a.manufacturer === filter)),
    [fleet, filter]
  );

  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="La flotte"
          title="Six appareils, une mission"
          subtitle="De la navette inter-îles au très long-courrier transpacifique, chaque appareil Lagoon a un rôle précis dans le réseau."
        />

        {/* Filtres constructeur */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                filter === f
                  ? 'bg-lagoon/20 text-lagoon-soft border border-lagoon/50'
                  : 'glass text-foam/60 hover:text-foam'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {!fleet ? (
          <LoadingSpinner label="Chargement de la flotte…" />
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {filtered.map((aircraft) => (
              <AircraftCard key={aircraft.code} {...aircraft} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
