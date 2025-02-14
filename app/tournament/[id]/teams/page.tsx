"use client";

import { TournamentHeader } from "../components/header";
import { TeamsList } from "./components/teams-list";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

export default function TeamsPage() {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teams
          </h1>
          <Button size="sm">
            <HiPlus className="mr-2 size-4" />
            Register Team
          </Button>
        </div>
        <TeamsList />
      </div>
    </div>
  );
}
