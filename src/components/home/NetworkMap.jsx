import { useEffect, useState } from 'react';
import SectionTitle from '../common/SectionTitle.jsx';
import RouteMap from '../map/RouteMap.jsx';
import { getRoutes } from '../../services/flights.js';

export default function NetworkMap() {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    getRoutes().then(setRoutes);
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Carte du réseau"
          title="Nos routes, en un coup d'œil"
          subtitle="Du hub de Paris CDG aux atolls du Pacifique : chaque arc représente une route officielle Lagoon."
        />
        <div className="mt-12">
          {routes && <RouteMap routes={routes} className="h-[420px]" />}
        </div>
      </div>
    </section>
  );
}
