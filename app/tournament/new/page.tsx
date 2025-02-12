"use client";

import { TournamentForm } from "../components/tournament-form";
import { Database } from "@/types/supabase/types";
import { Header } from "@/app/components/layout/header";

type TournamentInsert = Database["public"]["Tables"]["tournament"]["Insert"];

export default function NewTournament() {
  const handleSubmit = async (data: TournamentInsert) => {
    const response = await fetch("/api/tournament/create", {
      method: "POST",
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

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Create New Tournament
        </h1>
        <TournamentForm onSubmit={handleSubmit} submitLabel="Create Tournament" />
      </div>
    </div>
  );
}
