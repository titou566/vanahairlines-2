import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import RouteStrip from '../components/routes/RouteStrip.jsx';
import RouteMap from '../components/map/RouteMap.jsx';
import { getRoutes } from '../services/flights.js';

export default function RoutesPage() {
  useDocumentTitle('Routes');
  const [query, setQuery] = useState('');
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getRoutes().then((data) => {
      if (!cancelled) setRoutes(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!routes) return [];
    const q = query.trim().toUpperCase();
    if (!q) return routes;
    return routes.filter((r) =>
      [r.fn, r.dep, r.arr, r.aircraft].some((field) => field?.toUpperCase().includes(q))
    );
  }, [routes, query]);

  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Le réseau"
          title="Nos routes"
          subtitle="Recherchez par numéro de vol, code OACI ou appareil. Le réseau s'étoffera au fil des saisons."
        />

        {routes && (
          <div className="mt-10">
            <RouteMap routes={routes} className="h-[380px]" />
          </div>
        )}

        <div className="glass mt-8 flex items-center gap-3 rounded-full px-5 py-3">
          <Search className="h-4 w-4 shrink-0 text-foam/40" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : LGN001, FMEE, B38M…"
            className="w-full bg-transparent font-mono text-sm tracking-wide text-foam placeholder:text-foam/30 focus:outline-none"
            aria-label="Rechercher une route"
          />
        </div>

        {!routes ? (
          <LoadingSpinner label="Chargement des routes…" />
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            {filtered.map((route) => (
              <RouteStrip key={route.fn} {...route} />
            ))}
            {filtered.length === 0 && (
              <p className="py-10 text-center font-mono text-sm uppercase tracking-[0.2em] text-foam/40">
                Aucune route ne correspond à « {query} »
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
