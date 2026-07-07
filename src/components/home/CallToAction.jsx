import Button from '../common/Button.jsx';
import Chip from '../common/Chip.jsx';
import { DISCORD_URL } from '../../utils/constants.js';

export default function CallToAction() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="glass mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl px-6 py-14 text-center">
        <Chip tone="sunset">Recrutement ouvert</Chip>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Prêt à embarquer&nbsp;?
        </h2>
        <p className="max-w-xl text-foam/60">
          Que vous voliez sur ATR entre deux atolls ou sur A350 au-dessus du Pacifique, il y a un
          siège pour vous dans le cockpit.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/rejoindre" variant="sunset" size="lg">
            Déposer ma candidature
          </Button>
          <Button href={DISCORD_URL} variant="glass" size="lg">
            Discord Lagoon
          </Button>
        </div>
      </div>
    </section>
  );
}
