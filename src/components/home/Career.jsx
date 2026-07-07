import SectionTitle from '../common/SectionTitle.jsx';
import { useRanks } from '../../context/RanksContext.jsx';

/** Échelle de carrière — donne envie de grimper les grades. */
export default function Career() {
  const { ranks: RANKS } = useRanks();
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Carrière"
          title="Du Cadet du Lagon à la Légende du Lagon"
          subtitle="Chaque heure de vol approuvée fait progresser votre grade et vos points carrière. Jusqu'où irez-vous ?"
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-2">
          {RANKS.map((rank, i) => (
            <div
              key={rank.name}
              className="glass group relative flex flex-col items-center gap-2 rounded-2xl px-3 py-6 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${rank.color}30` }}
            >
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                {rank.icon}
              </span>
              <span className="font-display text-sm font-bold leading-tight" style={{ color: rank.color }}>
                {rank.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foam/40">
                {rank.min_hours === 0 ? 'Départ' : `${rank.min_hours} h+`}
              </span>
              {i < RANKS.length - 1 && (
                <span className="absolute -right-2 top-1/2 hidden h-px w-3 bg-foam/15 lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-foam/35">
          10 points carrière par heure de vol approuvée
        </p>
      </div>
    </section>
  );
}
