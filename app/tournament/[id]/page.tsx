"use client";

import { TournamentHeader } from "./components/header";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Database } from "@/types/supabase/types";
import { InformationCard } from "./components/information-card";
import { UpcomingCard } from "./components/upcoming-card";
import { TournamentNotFound } from "./components/tournament-not-found";
import { TournamentInfo } from "./components/tournament-info";
import { Button, Spinner } from "flowbite-react";
import { HiPencil } from "react-icons/hi2";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];

export default function Tournament() {
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

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
          <Spinner size="xl" />
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {tournament.name}
          </h1>
          <Button
            onClick={() => router.push(`/tournament/${id}/edit`)}
            size="sm"
          >
            <HiPencil className="mr-2 size-4" />
            Edit Tournament
          </Button>
        </div>

        <TournamentInfo tournament={tournament} />

        {/* Large Info Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InformationCard description={tournament.description || ""} />
          <UpcomingCard />
        </div>
      </div>
    </div>
  );
}
