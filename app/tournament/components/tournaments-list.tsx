"use client";

import { Database } from "@/types/supabase/types";
import Tournament from "./tournament";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function TournamentsList() {
  const router = useRouter();
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
          throw new Error(
            "Failed to fetch tournaments - Maybe you're not logged in",
          );
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

  return (
    <div className="m-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Tournaments
        </h2>
        <Button onClick={() => router.push("/tournament/new")} size="sm">
          <HiPlus className="mr-2 size-4" />
          Create Tournament
        </Button>
      </div>

      {tournaments.length === 0 ? (
        <div className="flex items-center justify-center rounded-lg border border-gray-200 p-8 dark:border-gray-700">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No tournaments found. Create one to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Tournament key={tournament.id} data={tournament} />
          ))}
        </div>
      )}
    </div>
  );
}
