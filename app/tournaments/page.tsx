import { Header } from "../components/header";
import TournamentsList from "../components/tournament/tournaments-list";

export default function TournamentsPage() {
  return (
    <main className="min-h-screen dark:bg-gray-800">
      <Header />
      <TournamentsList />
    </main>
  );
}
