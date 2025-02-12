import { Card } from "flowbite-react";
import { IoMdTrophy, IoMdPeople } from "react-icons/io";
import { BsCalendarCheck } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { Database } from "@/types/supabase/types";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];

interface TournamentInfoProps {
  tournament: Tournament;
}

export function TournamentInfo({ tournament }: TournamentInfoProps) {
  return (
    <>
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
    </>
  );
}
