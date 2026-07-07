import { Compass, ClipboardCheck, Award, Users } from 'lucide-react';
import GlassCard from '../common/GlassCard.jsx';
import SectionTitle from '../common/SectionTitle.jsx';

const FEATURES = [
  {
    icon: Compass,
    title: 'Réseau inter-îles',
    text: 'Un réseau pensé autour des territoires français d\'outre-mer : liaisons long-courrier depuis la métropole et navettes inter-îles en ATR.',
  },
  {
    icon: ClipboardCheck,
    title: 'PIREPs simplifiés',
    text: 'Soumettez vos rapports de vol en quelques clics. Le suivi automatique ACARS est prévu dans une prochaine version.',
  },
  {
    icon: Award,
    title: 'Progression & badges',
    text: 'Grades, heures de vol, badges de destinations : votre carrière de pilote virtuel progresse à chaque vol.',
  },
  {
    icon: Users,
    title: 'Communauté IVAO',
    text: 'Vols de groupe, événements IVAO France et entraide entre pilotes, du débutant au confirmé.',
  },
];

export default function Features() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="La compagnie"
          title="Une VA pensée comme un vrai logiciel"
          subtitle="Lagoon Airways n'est pas qu'un site vitrine : c'est une plateforme d'opérations aériennes virtuelles, construite pour durer."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <GlassCard key={title} hover className="flex flex-col gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lagoon/15">
                <Icon className="h-5 w-5 text-lagoon-soft" />
              </span>
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-foam/55">{text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
