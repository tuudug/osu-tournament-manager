"use client";

import { HiMiniCubeTransparent } from "react-icons/hi2";
import { TournamentHeader } from "./components/header";
import { IoMdTrophy, IoMdPeople } from "react-icons/io";
import { BsCalendarCheck } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Database } from "@/types/supabase/types";
import { Card } from "flowbite-react";
import { InformationCard } from "./components/information-card";
import { UpcomingCard } from "./components/upcoming-card";

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
    return (
      <div className="min-h-screen dark:bg-gray-800">
        <TournamentHeader />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="max-w-sm">
            <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-center text-center text-6xl text-black dark:text-white">
                <HiMiniCubeTransparent />
              </div>
              <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Tournament not found
              </h5>
              <p className="text-center font-normal text-gray-700 dark:text-gray-400">
                The tournament you are looking for does not exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Tournament Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
            {tournament.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {tournament.description || "No description provided"}
          </p>
        </div>

        {/* Tournament Info Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-pink-100 p-3 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400">
                <IoMdTrophy className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Format
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.team_size}v{tournament.vs_size}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-purple-100 p-3 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
                <IoMdPeople className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Staff
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.referee_ids?.length || 0} Referees
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-indigo-100 p-3 text-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400">
                <FaChartLine className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Rank Range
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {tournament.rank_limit_lower || "∞"} -{" "}
                  {tournament.rank_limit_upper || "∞"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-pink-100 p-3 text-pink-500 dark:bg-pink-900/20 dark:text-pink-400">
                <BsCalendarCheck className="size-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Created
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {new Date(tournament.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Large Info Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <InformationCard />
          <UpcomingCard />
        </div>
      </div>
    </div>
  );
}
