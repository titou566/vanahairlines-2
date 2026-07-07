import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Bouton retour en haut, apparaît après un scroll conséquent. */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      className="glass-strong fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-lagoon-soft transition-all duration-200 hover:-translate-y-0.5 hover:text-lagoon"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
