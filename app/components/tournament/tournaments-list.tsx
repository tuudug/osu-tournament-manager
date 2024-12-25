"use client";

import { Database } from "@/types/supabase/types";
import Tournament from "./tournament";
import { useEffect, useState } from "react";

export default function TournamentsList() {
  const [tournaments, setTournaments] = useState<
    Database["public"]["Tables"]["tournament"]["Row"][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("/api/tournament/get");
        if (!response.ok) {
          throw new Error("Failed to fetch tournaments");
        }
        const { data } = await response.json();
        setTournaments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Loading tournaments...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No tournaments found
        </p>
      </div>
    );
  }

  return (
    <div className="m-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Tournaments
      </h2>
      {tournaments.map((tournament) => (
        <Tournament key={tournament.id} data={tournament} />
      ))}
    </div>
  );
}
