/** Liens officiels de la compagnie. */
export const DISCORD_URL = 'https://discord.gg/R8x9BwJsJ';
export const CEO_EMAIL = 'vanahairlines.ceo@gmail.com';
export const COO_EMAIL = 'vanahairlines.coo@gmail.com';

/** Liens de navigation principaux. */
export const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'Flotte', to: '/flotte' },
  { label: 'Routes', to: '/routes' },
  { label: 'Classement', to: '/classement' },
  { label: 'Règlement', to: '/reglement' },
  { label: 'Rejoindre', to: '/rejoindre' },
  { label: 'Contact', to: '/contact' },
];

/** Statistiques affichées sur l'accueil (à brancher sur Supabase en V2.3). */
export const STATS = [
  { value: '12', label: 'Pilotes actifs' },
  { value: '87', label: 'Vols enregistrés' },
  { value: '214', label: 'Heures de vol' },
  { value: '11', label: 'Destinations' },
];

/** Destinations mises en avant. */
export const DESTINATIONS = [
  { city: 'Papeete', icao: 'NTAA', region: 'Polynésie française', gradient: 'from-lagoon-deep via-lagoon to-lagoon-soft' },
  { city: 'Saint-Denis', icao: 'FMEE', region: 'La Réunion', gradient: 'from-ocean-2 via-lagoon-deep to-lagoon' },
  { city: 'Nouméa', icao: 'NWWW', region: 'Nouvelle-Calédonie', gradient: 'from-lagoon-deep via-ocean-2 to-sunset/70' },
  { city: 'Pointe-à-Pitre', icao: 'TFFR', region: 'Guadeloupe', gradient: 'from-sunset via-coral to-lagoon-deep' },
  { city: 'Fort-de-France', icao: 'TFFF', region: 'Martinique', gradient: 'from-coral via-sunset to-ocean-2' },
  { city: 'Paris CDG', icao: 'LFPG', region: 'Hub métropole', gradient: 'from-ocean-2 via-ocean to-lagoon-deep' },
];

/** Flotte de la compagnie. */
export const FLEET = [
  {
    name: 'ATR 72-600',
    code: 'AT76',
    manufacturer: 'ATR',
    role: 'Inter-îles',
    description: 'Le cheval de trait des liaisons courtes entre les îles. Robuste, économique, emblématique des tropiques.',
    range: '1 528 km',
    pax: 72,
    cruise: '510 km/h',
  },
  {
    name: 'Airbus A320neo',
    code: 'A20N',
    manufacturer: 'Airbus',
    role: 'Moyen-courrier',
    description: 'La colonne vertébrale du réseau régional. Liaisons inter-DOM et dessertes moyennes distances.',
    range: '6 300 km',
    pax: 180,
    cruise: 'M 0.78',
  },
  {
    name: 'Airbus A330-900',
    code: 'A339',
    manufacturer: 'Airbus',
    role: 'Long-courrier',
    description: 'Le vaisseau amiral des liaisons métropole ↔ outre-mer. Confort et rayon d\'action.',
    range: '13 334 km',
    pax: 287,
    cruise: 'M 0.85',
  },
  {
    name: 'Airbus A350-900',
    code: 'A359',
    manufacturer: 'Airbus',
    role: 'Très long-courrier',
    description: 'Réservé aux ultra-longues distances vers le Pacifique. La vitrine technologique de Lagoon.',
    range: '15 372 km',
    pax: 325,
    cruise: 'M 0.85',
  },
  {
    name: 'Boeing 737 MAX 8',
    code: 'B38M',
    manufacturer: 'Boeing',
    role: 'Moyen-courrier',
    description: 'Le complément moderne de l\'A320neo : liaisons régionales caribéennes et vols vers les Amériques.',
    range: '6 480 km',
    pax: 178,
    cruise: 'M 0.79',
  },
  {
    name: 'Boeing 787-9 Dreamliner',
    code: 'B789',
    manufacturer: 'Boeing',
    role: 'Long-courrier',
    description: 'Efficience et confort cabine pour les longues étapes métropole ↔ Antilles et océan Indien.',
    range: '14 140 km',
    pax: 296,
    cruise: 'M 0.85',
  },
];

/** Réseau de routes (échantillon V2 — sera géré via Supabase en V2.2+). */
export const ROUTES = [
  { fn: 'LGN001', dep: 'LFPG', arr: 'FMEE', aircraft: 'A339', block: '11:05' },
  { fn: 'LGN002', dep: 'FMEE', arr: 'LFPG', aircraft: 'A339', block: '11:20' },
  { fn: 'LGN110', dep: 'FMEE', arr: 'FMCZ', aircraft: 'A20N', block: '01:55' },
  { fn: 'LGN112', dep: 'FMEE', arr: 'FIMP', aircraft: 'AT76', block: '00:45' },
  { fn: 'LGN115', dep: 'FMEE', arr: 'FMMI', aircraft: 'B38M', block: '01:50' },
  { fn: 'LGN201', dep: 'LFPG', arr: 'TFFR', aircraft: 'B789', block: '08:20' },
  { fn: 'LGN210', dep: 'TFFR', arr: 'KMIA', aircraft: 'B38M', block: '02:55' },
  { fn: 'LGN203', dep: 'TFFR', arr: 'TFFF', aircraft: 'AT76', block: '00:35' },
  { fn: 'LGN205', dep: 'TFFF', arr: 'TFFJ', aircraft: 'AT76', block: '00:50' },
  { fn: 'LGN301', dep: 'NTAA', arr: 'NWWW', aircraft: 'A359', block: '05:40' },
  { fn: 'LGN302', dep: 'NWWW', arr: 'NTAA', aircraft: 'A359', block: '05:25' },
  { fn: 'LGN310', dep: 'NTAA', arr: 'NTTB', aircraft: 'AT76', block: '00:20' },
];

/** Règlement de la compagnie. */
export const RULES = [
  {
    title: 'Adhésion',
    items: [
      'Disposer d\'un compte IVAO actif et en règle.',
      'Avoir un simulateur compatible (MSFS, X-Plane, P3D).',
      'Être respectueux envers les membres et le staff.',
    ],
  },
  {
    title: 'Opérations de vol',
    items: [
      'Tout vol officiel doit être effectué connecté au réseau IVAO.',
      'Le callsign utilisé doit correspondre au vol réservé (ex : LGN001).',
      'Le respect des procédures et de la phraséologie est attendu.',
      'Les PIREPs doivent être soumis dans les 48h suivant le vol.',
    ],
  },
  {
    title: 'Activité',
    items: [
      'Un vol minimum par mois est demandé pour rester pilote actif.',
      'Une absence prolongée doit être signalée au staff (congés).',
    ],
  },
  {
    title: 'Comportement',
    items: [
      'Aucun comportement anti-jeu ou irrespectueux sur le réseau.',
      'Lagoon Airways représente la France sur IVAO : soignez votre image.',
    ],
  },
];

/** Flight strips affichés dans le hero (rotation). */
export const HERO_STRIPS = [
  'LGN001 · LFPG → FMEE · A330-900 · EN ROUTE',
  'LGN301 · NTAA → NWWW · A350-900 · CLIMB FL380',
  'LGN203 · TFFR → TFFF · ATR 72-600 · APPROACH',
  'LGN112 · FMEE → FIMP · ATR 72-600 · BOARDING',
  'LGN210 · TFFR → KMIA · B737 MAX 8 · TAXI OUT',
];
