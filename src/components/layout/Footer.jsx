import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { NAV_LINKS, DISCORD_URL } from '../../utils/constants.js';
import Chip from '../common/Chip.jsx';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-foam/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Marque */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lagoon to-sunset">
              <Plane className="h-4 w-4 text-abyss" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold">LAGOON AIRWAYS</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-foam/50">
            Compagnie aérienne virtuelle française sur le réseau IVAO. Des lagons du Pacifique aux
            Antilles, nous relions les îles.
          </p>
          <Chip tone="sunset">L'Esprit des Îles</Chip>
          <a
            href="https://ivao.aero"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex w-fit items-center rounded-xl bg-foam/95 px-3 py-2 transition-transform hover:scale-[1.02]"
            aria-label="Partenaire officiel IVAO"
          >
            <img src="/ivao-partner.png" alt="IVAO Partner VA" className="h-9 w-auto" />
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-foam/40">
            Navigation
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-foam/60 transition-colors hover:text-lagoon-soft">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Communauté */}
        <div>
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-foam/40">
            Communauté
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-foam/60">
            <li>
              <a href="https://ivao.aero" target="_blank" rel="noreferrer" className="transition-colors hover:text-lagoon-soft">
                Réseau IVAO
              </a>
            </li>
            <li>
              <a href="https://ivao.fr" target="_blank" rel="noreferrer" className="transition-colors hover:text-lagoon-soft">
                IVAO France
              </a>
            </li>
            <li>
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-lagoon-soft">
                Discord Lagoon
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foam/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-foam/40 sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Lagoon Airways — Compagnie virtuelle. Simulation uniquement.</span>
          <span className="font-mono uppercase tracking-[0.2em]">ICAO LGN · lagoon-airways.fr</span>
        </div>
      </div>
    </footer>
  );
}
