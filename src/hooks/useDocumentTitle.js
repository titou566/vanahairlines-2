import { useEffect } from 'react';

/** Met à jour le titre de l'onglet : "Page · Lagoon Airways". */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Lagoon Airways` : 'Lagoon Airways — L\'Esprit des Îles';
  }, [title]);
}
