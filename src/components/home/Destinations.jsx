import SectionTitle from '../common/SectionTitle.jsx';
import { DESTINATIONS } from '../../utils/constants.js';

function DestinationCard({ city, icao, region, gradient }) {
  return (
    <div className="group relative h-44 overflow-hidden rounded-2xl border border-foam/10">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80`}
      />
      <span
        className="absolute -right-2 -top-4 font-mono text-7xl font-semibold tracking-tighter text-foam/10 transition-colors duration-500 group-hover:text-foam/20"
        aria-hidden="true"
      >
        {icao}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-abyss/80 to-transparent p-4">
        <div>
          <h3 className="font-display text-xl font-bold">{city}</h3>
          <p className="text-xs text-foam/60">{region}</p>
        </div>
        <span className="font-mono text-xs tracking-[0.2em] text-lagoon-soft">{icao}</span>
      </div>
    </div>
  );
}

export default function Destinations() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Le réseau"
          title="Des destinations qui font rêver"
          subtitle="Le cœur de Lagoon bat dans les outre-mer : Polynésie, océan Indien, Antilles… avec la métropole comme porte d'entrée."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.icao} {...dest} />
          ))}
        </div>
      </div>
    </section>
  );
}
