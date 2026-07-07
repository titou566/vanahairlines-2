/**
 * Système de carrière Lagoon Airways.
 * Les grades sont CONFIGURABLES : ils vivent dans la table Supabase `ranks`
 * (gérée depuis LagoonOS → Staff → Grades). Ce fichier fournit les valeurs
 * par défaut (fallback hors-ligne) et les fonctions de calcul.
 */
export const DEFAULT_RANKS = [
  { name: 'Cadet du Lagon', min_hours: 0, color: '#7FE0D6', icon: '🌱', perk: 'Bienvenue à bord — accès aux routes inter-îles en ATR.' },
  { name: 'Officier Pilote', min_hours: 10, color: '#46C4CE', icon: '✈️', perk: 'Accès aux moyens-courriers (A320neo, 737 MAX 8).' },
  { name: 'Premier Officier', min_hours: 25, color: '#0C8C9E', icon: '🧭', perk: 'Priorité sur les réservations lors des événements IVAO.' },
  { name: 'Premier Officier Senior', min_hours: 50, color: '#FF9F5A', icon: '🌅', perk: 'Accès aux long-courriers (A330-900, 787-9).' },
  { name: 'Commandant', min_hours: 100, color: '#FF7F66', icon: '⭐', perk: 'Accès à toute la flotte, dont l\'A350-900 transpacifique.' },
  { name: 'Commandant Senior', min_hours: 200, color: '#FFD97D', icon: '👑', perk: 'Mentor officiel des nouveaux cadets de la compagnie.' },
  { name: 'Légende du Lagon', min_hours: 350, color: '#FFF1C9', icon: '🌴', perk: 'Le sommet. Votre nom entre dans l\'histoire de Lagoon Airways.' },
];

/** Grade correspondant à un nombre d'heures, dans une liste de grades donnée. */
export function getRank(hours = 0, ranks = DEFAULT_RANKS) {
  let current = ranks[0];
  for (const rank of ranks) {
    if (hours >= rank.min_hours) current = rank;
  }
  return current;
}

/** Grade suivant (ou null si au sommet). */
export function getNextRank(hours = 0, ranks = DEFAULT_RANKS) {
  return ranks.find((r) => r.min_hours > hours) ?? null;
}

/** Progression 0→1 vers le grade suivant. */
export function getRankProgress(hours = 0, ranks = DEFAULT_RANKS) {
  const current = getRank(hours, ranks);
  const next = getNextRank(hours, ranks);
  if (!next) return 1;
  return Math.min(1, (hours - current.min_hours) / (next.min_hours - current.min_hours));
}

/** Points gagnés pour un temps de vol donné : 10 points / heure. */
export function pointsForFlight(flightTime = 0) {
  return Math.round(flightTime * 10);
}
