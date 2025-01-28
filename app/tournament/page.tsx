import { Header } from "../components/layout/header";
import TournamentsList from "./components/tournaments-list";

export default function TournamentsPage() {
  return (
    <main className="min-h-screen dark:bg-gray-800">
      <Header />
      <TournamentsList />
    </main>
  );
}
