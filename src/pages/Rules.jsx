import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import { RULES } from '../utils/constants.js';

export default function Rules() {
  useDocumentTitle('Règlement');
  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          eyebrow="Règlement"
          title="Voler avec exigence"
          subtitle="Quelques règles simples pour garantir la qualité des opérations et la bonne ambiance à bord."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {RULES.map((section) => (
            <GlassCard key={section.title} className="p-6">
              <h3 className="font-display text-lg font-bold text-lagoon-soft">{section.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foam/65">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sunset" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-foam/35">
          Règlement V2.0 — susceptible d'évoluer avec la compagnie
        </p>
      </div>
    </section>
  );
}
