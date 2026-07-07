/**
 * Badges Lagoon Airways — calculés côté client à partir du profil et des
 * PIREPs approuvés. `stats` = { hours, points, pireps } où `pireps` est la
 * liste des PIREPs approuvés (optionnelle : les badges de destination sont
 * masqués si absente, ex. sur les profils publics).
 */
export const BADGES = [
  { id: 'first-flight', icon: '🛫', name: 'Premier décollage', desc: 'Premier vol approuvé', needsPireps: true, test: (s) => s.approvedCount >= 1 },
  { id: 'island-hopper', icon: '🏝️', name: 'Island Hopper', desc: '5 vols approuvés', needsPireps: true, test: (s) => s.approvedCount >= 5 },
  { id: 'frequent-flyer', icon: '🧳', name: 'Habitué du lagon', desc: '15 vols approuvés', needsPireps: true, test: (s) => s.approvedCount >= 15 },
  { id: 'pacific', icon: '🌺', name: 'Route du Pacifique', desc: 'Atterrir à Papeete (NTAA)', needsPireps: true, test: (s) => s.airports.has('NTAA') },
  { id: 'indian-ocean', icon: '🌋', name: 'Océan Indien', desc: 'Atterrir à La Réunion (FMEE)', needsPireps: true, test: (s) => s.airports.has('FMEE') },
  { id: 'caribbean', icon: '🍹', name: 'Cap sur les Antilles', desc: 'Atterrir à TFFR ou TFFF', needsPireps: true, test: (s) => s.airports.has('TFFR') || s.airports.has('TFFF') },
  { id: 'long-haul', icon: '🌙', name: 'Vol de nuit', desc: 'Un vol de 8 h ou plus', needsPireps: true, test: (s) => s.maxFlightTime >= 8 },
  { id: 'fifty', icon: '⏱️', name: 'Demi-centurion', desc: '50 heures de vol', needsPireps: false, test: (s) => s.hours >= 50 },
  { id: 'centurion', icon: '💯', name: 'Centurion', desc: '100 heures de vol', needsPireps: false, test: (s) => s.hours >= 100 },
  { id: 'legend', icon: '🌴', name: 'Légende vivante', desc: '350 heures de vol', needsPireps: false, test: (s) => s.hours >= 350 },
];

export function computeBadges({ hours = 0, points = 0, pireps = null }) {
  const approved = (pireps ?? []).filter((p) => p.status === 'approved');
  const stats = {
    hours: Number(hours),
    points: Number(points),
    approvedCount: approved.length,
    airports: new Set(approved.map((p) => p.routes?.arrival_icao).filter(Boolean)),
    maxFlightTime: approved.reduce((m, p) => Math.max(m, Number(p.flight_time ?? 0)), 0),
  };

  return BADGES.filter((b) => pireps !== null || !b.needsPireps).map((b) => ({
    ...b,
    unlocked: b.test(stats),
  }));
}
