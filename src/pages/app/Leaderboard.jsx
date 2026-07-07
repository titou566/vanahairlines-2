import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import { PageHeader } from '../../components/app/ui.jsx';
import LeaderboardTable from '../../components/app/LeaderboardTable.jsx';

export default function Leaderboard() {
  useDocumentTitle('Classement');
  return (
    <>
      <PageHeader
        title="Classement des pilotes"
        subtitle="Points carrière : 10 par heure de vol approuvée. Qui décrochera la Légende des Îles ?"
      />
      <LeaderboardTable />
    </>
  );
}
