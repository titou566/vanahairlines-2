import { motion } from 'framer-motion';
import Button from '../common/Button.jsx';
import Chip from '../common/Chip.jsx';
import DeparturesBoard from './DeparturesBoard.jsx';

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <section className="relative px-4 pb-14 pt-32 sm:px-6 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Colonne texte */}
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
          <motion.div {...rise(0)}>
            <Chip>Compagnie virtuelle · Réseau IVAO</Chip>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="font-display text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl"
          >
            L'Esprit
            <br />
            <span className="text-gradient">des Îles.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="max-w-xl text-lg leading-relaxed text-foam/60">
            Des lagons du Pacifique aux Antilles, Lagoon Airways relie les territoires français
            d'outre-mer sur IVAO. Carrière, grades, points : votre aventure de pilote virtuel
            commence ici.
          </motion.p>

          <motion.div {...rise(0.24)} className="flex flex-col gap-4 sm:flex-row">
            <Button to="/connexion" variant="sunset" size="lg">
              Devenir pilote
            </Button>
            <Button to="/routes" variant="glass" size="lg">
              Explorer le réseau
            </Button>
          </motion.div>
        </div>

        {/* Colonne tableau des départs */}
        <motion.div {...rise(0.32)} className="w-full">
          <DeparturesBoard />
        </motion.div>
      </div>
    </section>
  );
}
