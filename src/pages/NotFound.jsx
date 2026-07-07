import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Button from '../components/common/Button.jsx';

export default function NotFound() {
  useDocumentTitle('Page introuvable');
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-4 pt-24 text-center">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-sunset">
        Erreur 404 · Piste introuvable
      </span>
      <h1 className="font-display text-6xl font-extrabold md:text-7xl">
        4<span className="text-gradient">0</span>4
      </h1>
      <p className="max-w-md text-foam/55">
        Cette page a été déroutée vers une destination inconnue. Retournez vers un aéroport
        contrôlé.
      </p>
      <Button to="/">Retour à l'accueil</Button>
    </section>
  );
}
