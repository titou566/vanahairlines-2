import { useEffect, useState } from 'react';
import { Megaphone, Trash2 } from 'lucide-react';
import useDocumentTitle from '../../../hooks/useDocumentTitle.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import GlassCard from '../../../components/common/GlassCard.jsx';
import Button from '../../../components/common/Button.jsx';
import LoadingSpinner from '../../../components/common/LoadingSpinner.jsx';
import { PageHeader, inputCls, labelCls } from '../../../components/app/ui.jsx';
import { getNews, addNews, deleteNews } from '../../../services/news.js';

export default function StaffNews() {
  useDocumentTitle('Annonces');
  const { user } = useAuth();
  const [news, setNews] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posting, setPosting] = useState(false);

  const load = () => getNews(50).then(setNews);
  useEffect(() => {
    load();
  }, []);

  const post = async () => {
    setPosting(true);
    const { error } = await addNews({ title, content, author: user.id });
    setPosting(false);
    if (error) {
      alert(`Erreur : ${error.message}`);
      return;
    }
    setTitle('');
    setContent('');
    load();
  };

  const remove = async (id) => {
    await deleteNews(id);
    load();
  };

  if (!news) return <LoadingSpinner label="Chargement des annonces…" />;

  return (
    <>
      <PageHeader
        title="Annonces de la compagnie"
        subtitle="Publiées sur le tableau de bord de tous les pilotes : événements, nouvelles routes, infos staff."
      />

      <GlassCard className="mb-5 max-w-2xl p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Titre</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Événement IVAO ce samedi !" />
          </div>
          <div>
            <label className={labelCls}>Contenu</label>
            <textarea rows={3} value={content} onChange={(e) => setContent(e.target.value)} className={`${inputCls} resize-none`} placeholder="Détails de l'annonce..." />
          </div>
          <Button onClick={post} disabled={!title.trim() || posting}>
            <Megaphone className="h-4 w-4" />
            {posting ? 'Publication…' : 'Publier l\'annonce'}
          </Button>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-3">
        {news.map((n) => (
          <GlassCard key={n.id} className="flex items-start gap-4 px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold">{n.title}</p>
                <span className="font-mono text-[10px] text-foam/35">
                  {new Date(n.created_at).toLocaleDateString('fr-FR')}
                </span>
              </div>
              {n.content && <p className="mt-1 text-xs leading-relaxed text-foam/55">{n.content}</p>}
            </div>
            <button
              onClick={() => remove(n.id)}
              className="rounded-lg p-2 text-foam/40 transition-colors hover:bg-coral/10 hover:text-coral"
              aria-label="Supprimer l'annonce"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
