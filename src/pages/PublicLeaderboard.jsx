import useDocumentTitle from '../hooks/useDocumentTitle.js';
import SectionTitle from '../components/common/SectionTitle.jsx';
import LeaderboardTable from '../components/app/LeaderboardTable.jsx';

export default function PublicLeaderboard() {
  useDocumentTitle('Classement');
  return (
    <section className="px-4 pb-10 pt-36 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Classement"
          title="Les pilotes Lagoon"
          subtitle="Le tableau d'honneur de la compagnie — points, heures et grades, mis à jour à chaque vol approuvé."
        />
        <div className="mt-12">
          <LeaderboardTable />
        </div>
      </div>
    </section>
  );
}
