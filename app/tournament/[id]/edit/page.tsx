"use client";

import { TournamentForm } from "../../components/tournament-form";
import { Database } from "@/types/supabase/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/app/components/layout/header";
import { Spinner } from "flowbite-react";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];
type TournamentInsert = Database["public"]["Tables"]["tournament"]["Insert"];

export default function EditTournament() {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const response = await fetch(`/api/tournament/get?id=${id}`);
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error);
        }

        setTournament(json.data);
      } catch (error) {
        console.error("Error fetching tournament:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  const handleSubmit = async (data: TournamentInsert) => {
    const response = await fetch(`/api/tournament/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-800">
        <Header />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <Spinner size="xl" />
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen dark:bg-gray-800">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            Tournament not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Edit Tournament: {tournament.name}
        </h1>
        <TournamentForm
          tournament={tournament}
          onSubmit={handleSubmit}
          submitLabel="Update Tournament"
        />
      </div>
    </div>
  );
}
