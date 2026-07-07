import { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AIRPORTS } from '../../utils/airports.js';

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const HUB = 'LFPG';

/** Arc orthodromique (grand cercle) entre deux aéroports, en ~48 segments. */
function greatCircle(a, b, segments = 48) {
  const lat1 = a.lat * D2R, lon1 = a.lon * D2R;
  const lat2 = b.lat * D2R, lon2 = b.lon * D2R;

  const x1 = Math.cos(lat1) * Math.cos(lon1), y1 = Math.cos(lat1) * Math.sin(lon1), z1 = Math.sin(lat1);
  const x2 = Math.cos(lat2) * Math.cos(lon2), y2 = Math.cos(lat2) * Math.sin(lon2), z2 = Math.sin(lat2);

  const dot = Math.min(1, Math.max(-1, x1 * x2 + y1 * y2 + z1 * z2));
  const angle = Math.acos(dot);
  if (angle < 1e-6) return [[a.lat, a.lon], [b.lat, b.lon]];

  const points = [];
  let prevLon = null;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const s1 = Math.sin((1 - t) * angle) / Math.sin(angle);
    const s2 = Math.sin(t * angle) / Math.sin(angle);
    const x = s1 * x1 + s2 * x2;
    const y = s1 * y1 + s2 * y2;
    const z = s1 * z1 + s2 * z2;
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * R2D;
    let lon = Math.atan2(y, x) * R2D;
    // Déroule la longitude pour éviter le saut à l'antiméridien (Pacifique)
    if (prevLon !== null) {
      while (lon - prevLon > 180) lon -= 360;
      while (lon - prevLon < -180) lon += 360;
    }
    prevLon = lon;
    points.push([lat, lon]);
  }
  return points;
}

/**
 * Carte du réseau façon vAMSYS/Phoenix : fond sombre, arcs lagon animés
 * (halo + tirets défilants), hub mis en avant, légende OPS intégrée.
 */
export default function RouteMap({ routes = [], className = 'h-[420px]', legend = true }) {
  const { arcs, airports, bounds } = useMemo(() => {
    const usedIcaos = new Set();
    const arcsList = [];

    routes.forEach((r) => {
      const dep = AIRPORTS[r.dep];
      const arr = AIRPORTS[r.arr];
      if (!dep || !arr) return;
      usedIcaos.add(r.dep);
      usedIcaos.add(r.arr);
      arcsList.push({ id: r.fn, points: greatCircle(dep, arr) });
    });

    const airportList = [...usedIcaos].map((icao) => ({ icao, ...AIRPORTS[icao] }));
    const boundPoints = airportList.map((a) => [a.lat, a.lon]);
    return {
      arcs: arcsList,
      airports: airportList,
      bounds: boundPoints.length ? boundPoints : [[0, 0]],
    };
  }, [routes]);

  return (
    <div className={`relative z-0 overflow-hidden rounded-3xl border border-foam/10 shadow-[0_20px_60px_rgba(6,20,26,0.5)] ${className}`}>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [40, 40] }}
        scrollWheelZoom={false}
        worldCopyJump
        className="h-full w-full"
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {/* Halo sous les arcs */}
        {arcs.map((arc) => (
          <Polyline
            key={`glow-${arc.id}`}
            positions={arc.points}
            pathOptions={{ color: '#23C4AE', weight: 5, opacity: 0.12 }}
          />
        ))}

        {/* Arcs animés (tirets défilants) */}
        {arcs.map((arc) => (
          <Polyline
            key={arc.id}
            positions={arc.points}
            pathOptions={{ color: '#23C4AE', weight: 1.6, opacity: 0.8, className: 'route-line' }}
          />
        ))}

        {airports.map((a) => {
          const isHub = a.icao === HUB;
          return (
            <CircleMarker
              key={a.icao}
              center={[a.lat, a.lon]}
              radius={isHub ? 7 : 5}
              pathOptions={{
                color: isHub ? '#23C4AE' : '#FF8A4C',
                fillColor: isHub ? '#23C4AE' : '#FF8A4C',
                fillOpacity: 0.9,
                weight: isHub ? 2 : 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                <span className="font-mono text-xs">
                  <strong>{a.icao}</strong> — {a.name}
                  {isHub ? ' · HUB' : ''}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Légende OPS */}
      {legend && (
        <div className="glass-strong pointer-events-none absolute left-4 top-4 z-[500] rounded-xl px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lagoon-soft">
            Réseau Lagoon
          </p>
          <p className="mt-1 font-mono text-xs text-foam/70">
            {arcs.length} routes · {airports.length} aéroports
          </p>
          <p className="mt-1 flex items-center gap-2 font-mono text-[10px] text-foam/45">
            <span className="h-2 w-2 rounded-full bg-lagoon" /> Hub
            <span className="ml-2 h-2 w-2 rounded-full bg-sunset" /> Destination
          </p>
        </div>
      )}

      <span className="pointer-events-none absolute bottom-2 right-3 z-[500] font-mono text-[9px] uppercase tracking-widest text-foam/30">
        © OpenStreetMap · CARTO
      </span>
    </div>
  );
}
