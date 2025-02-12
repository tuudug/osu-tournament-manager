"use client";

import { TournamentHeader } from "./components/header";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Database } from "@/types/supabase/types";
import { InformationCard } from "./components/information-card";
import { UpcomingCard } from "./components/upcoming-card";
import { TournamentNotFound } from "./components/tournament-not-found";
import { TournamentInfo } from "./components/tournament-info";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];

export default function Tournament() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/tournament/get?id=${id}`);
        const json = await response.json();

        if (!response.ok) {
          console.error("Error fetching tournament:", json.error);
          setLoading(false);
          return;
        }

        setTournament(json.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tournament:", error);
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-800">
        <TournamentHeader />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return <TournamentNotFound />;
  }

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      <div className="container mx-auto px-4 py-8">
        <TournamentInfo tournament={tournament} />

        {/* Large Info Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InformationCard />
          <UpcomingCard />
        </div>
      </div>
    </div>
  );
}
