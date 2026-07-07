# 🌴 Lagoon Airways — V2

**L'Esprit des Îles.** Plateforme officielle de la compagnie aérienne virtuelle Lagoon Airways (ICAO `LGN`) sur le réseau IVAO.

> React · Vite · Tailwind CSS v4 · React Router · Supabase · Vercel

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. (Optionnel pour l'instant) Configurer Supabase
cp .env.example .env
# → renseigner VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY

# 3. Lancer le serveur de développement
npm run dev
```

Le site fonctionne **sans** Supabase en mode "vitrine" : toutes les pages publiques sont accessibles, seule l'authentification (Connexion / Dashboard) nécessite les clés `.env`.

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## ☁️ Déploiement Vercel

1. Pousser le projet sur GitHub.
2. Importer le repo dans Vercel (framework détecté : **Vite**).
3. Ajouter les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans *Settings → Environment Variables*.
4. Le fichier `vercel.json` gère déjà les rewrites SPA (pas de 404 sur les routes React Router).

## 🎨 Identité graphique

| Élément | Valeur |
|---|---|
| Fond abysse | `#06141A` |
| Lagon | `#23C4AE` |
| Lagon clair | `#7BE3D3` |
| Sunset | `#FF8A4C` |
| Corail | `#FF6A5E` |
| Sable | `#F2E7D5` |
| Écume (texte) | `#EAF6F2` |
| Titres | Bricolage Grotesque |
| Texte | Figtree |
| Données de vol | IBM Plex Mono |

Signature visuelle : les **flight strips** en police mono (callsigns, codes OACI) + le fond lagon animé. `prefers-reduced-motion` est respecté globalement.

Tous les tokens sont définis dans `src/index.css` (bloc `@theme` de Tailwind v4) : modifier une couleur là-bas la propage partout (`bg-lagoon`, `text-sunset`, etc.).

## 📁 Architecture

```
src/
├── components/
│   ├── auth/        ProtectedRoute (garde des routes privées)
│   ├── common/      Button, Chip, GlassCard, SectionTitle, Spinner, Background
│   ├── fleet/       AircraftCard
│   ├── home/        Hero, Stats, Features, Destinations, CallToAction
│   ├── layout/      Navbar, Footer
│   └── routes/      RouteStrip
├── context/         AuthContext (session Supabase)
├── hooks/           useDocumentTitle
├── layouts/         MainLayout (fond + navbar + footer)
├── lib/             supabase.js (client, tolérant si .env absent)
├── pages/           Home, Fleet, RoutesPage, Join, Contact, Rules, Login, Dashboard, NotFound
├── services/        flights.js (bascule constants → Supabase en V2.2)
└── utils/           constants.js (nav, flotte, routes, règlement, stats)
```

**Convention** : les données vivent dans `utils/constants.js` et transitent par `services/`. Quand Supabase sera branché, seuls les services changent — pas les composants.

## 🗺️ Roadmap

| Version | Contenu | Statut |
|---|---|---|
| **V2.0** | Socle : design system, layout, pages publiques, auth Supabase | ✅ Livré |
| V2.1 | Tables Supabase `pilots`, `routes`, `fleet` + branchement services | ⏳ |
| V2.2 | Réservation de vols + soumission PIREP | ⏳ |
| V2.3 | Dashboard pilote complet (heures, badges, progression) | ⏳ |
| V2.4 | Espace staff / administration | ⏳ |
| V3.0 | Certification VA IVAO + ACARS | 🌅 |

## 📝 Notes

- Compagnie **virtuelle** — simulation uniquement, aucun lien avec une compagnie réelle.
- Les statistiques de l'accueil et les routes sont des données d'exemple (V2.0), à remplacer via Supabase.
- Contacts officiels : `vanahairlines.ceo@gmail.com` / `vanahairlines.coo@gmail.com` — Discord : https://discord.gg/R8x9BwJsJ (définis dans `src/utils/constants.js`).
