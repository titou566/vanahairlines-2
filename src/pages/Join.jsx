import { UserPlus, FileText, PlaneTakeoff, Check } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import GlassCard from '../components/common/GlassCard.jsx';
import Button from '../components/common/Button.jsx';
import Chip from '../components/common/Chip.jsx';
import Career from '../components/home/Career.jsx';
import { DISCORD_URL } from '../utils/constants.js';

const STEPS = [
  {
    icon: UserPlus,
    step: 'Étape 1',
    title: 'Compte IVAO',
    text: 'Créez (ou vérifiez) votre compte sur le réseau IVAO. C\'est gratuit et indispensable pour voler avec nous.',
  },
  {
    icon: FileText,
    step: 'Étape 2',
    title: 'Inscription',
    text: 'Créez votre compte pilote sur le site (bouton Connexion → Inscription), puis complétez votre profil : VID IVAO et callsign.',
  },
  {
    icon: PlaneTakeoff,
    step: 'Étape 3',
    title: 'Premier vol',
    text: 'Réservez une route, volez sur IVAO, soumettez votre PIREP. Vos heures et points démarrent — bienvenue à bord !',
  },
];

const REQUIREMENTS = [
  'Compte IVAO actif et en règle',
  'Simulateur compatible : MSFS, X-Plane ou P3D',
  'Français courant (anglais OACI apprécié)',
  'Un vol minimum par mois pour rester actif',
  'Esprit d\'équipage et bonne humeur tropicale',
];

export default function Join() {
  useDocumentTitle('Rejoindre');
  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Recrutement"
          title="Rejoindre l'équipage"
          subtitle="Trois étapes séparent votre écran du cockpit d'un appareil Lagoon. Débutants bienvenus : on vous accompagne."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, step, title, text }) => (
            <GlassCard key={title} hover className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sunset/15">
                  <Icon className="h-5 w-5 text-sunset" />
                </span>
                <Chip tone="neutral">{step}</Chip>
              </div>
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-foam/55">{text}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mx-auto mt-10 max-w-2xl p-8">
          <h3 className="font-display text-lg font-bold">Prérequis</h3>
          <ul className="mt-5 flex flex-col gap-3">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="flex items-start gap-3 text-sm text-foam/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" aria-hidden="true" />
                {req}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/connexion" variant="sunset" size="lg">
              Créer mon compte pilote
            </Button>
            <Button href={DISCORD_URL} variant="glass" size="lg">
              Rejoindre le Discord
            </Button>
          </div>
        </GlassCard>
      </div>

      <Career />
    </section>
  );
}
