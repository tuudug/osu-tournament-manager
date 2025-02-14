"use client";

import { Database } from "@/types/supabase/types";
import { Avatar, Card } from "flowbite-react";
import { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

type Team = Database["public"]["Tables"]["tournament_team"]["Row"];

type Player = {
  userId: number;
  username: string;
  rank: string;
};

// Mock data for development
const mockPlayers: Record<number, Player> = {
  5145352: { userId: 5145352, username: "tutuchan812495", rank: "#3,870" },
  9918921: { userId: 9918921, username: "moss-", rank: "#78,325" },
  2: { userId: 2, username: "peppy", rank: "#761,943" },
  18983: { userId: 18983, username: "Doomsday", rank: "#3,386" },
};

type TeamWithSeed = Team & { seed: number };

const mockTeams: TeamWithSeed[] = [
  {
    id: 1,
    name: "Team Peppy",
    tournament_id: 1,
    captain_id: 2,
    player_ids: [2, 18983, 5145352],
    created_at: new Date().toISOString(),
    seed: 1,
    status: null, // Added to match the type definition
  },
  {
    id: 2,
    name: "Team Moss",
    tournament_id: 1,
    captain_id: 9918921,
    player_ids: [9918921, 5145352, 18983],
    created_at: new Date().toISOString(),
    seed: 2,
    status: null, // Added to match the type definition
  },
  {
    id: 3,
    name: "Team Moss",
    tournament_id: 1,
    captain_id: 9918921,
    player_ids: [9918921, 5145352, 18983],
    created_at: new Date().toISOString(),
    seed: 2,
    status: null, // Added to match the type definition
  },
  {
    id: 4,
    name: "Team Moss",
    tournament_id: 1,
    captain_id: 9918921,
    player_ids: [9918921, 5145352, 18983],
    created_at: new Date().toISOString(),
    seed: 2,
    status: null, // Added to match the type definition
  },
  {
    id: 5,
    name: "Team Moss",
    tournament_id: 1,
    captain_id: 9918921,
    player_ids: [9918921, 5145352, 18983],
    created_at: new Date().toISOString(),
    seed: 2,
    status: null, // Added to match the type definition
  },
  {
    id: 6,
    name: "Team Moss",
    tournament_id: 1,
    captain_id: 9918921,
    player_ids: [9918921, 5145352, 18983],
    created_at: new Date().toISOString(),
    seed: 2,
    status: null, // Added to match the type definition
  },
];

function TeamCard({ team }: { team: TeamWithSeed }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="relative h-auto w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header - Always visible */}
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {team.name}
        </h5>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          Seed #{team.seed}
        </span>
      </div>

      {/* Collapsed View - Player Avatars */}
      {!isExpanded && (
        <div className="mt-4 flex items-center gap-4">
          {/* Captain */}
          <div className="relative rounded-full ring-2 ring-yellow-400">
            <Avatar
              img={`https://a.ppy.sh/${team.captain_id}`}
              rounded
              size="md"
            />
          </div>
          {/* Other Players */}
          <div className="flex -space-x-4">
            {team.player_ids
              ?.filter((id) => id !== team.captain_id)
              .map((playerId) => (
                <Avatar
                  key={playerId}
                  img={`https://a.ppy.sh/${playerId}`}
                  rounded
                  size="md"
                />
              ))}
          </div>
        </div>
      )}

      {/* Expanded View - Detailed Player List */}
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Captain First */}
          <div className="flex items-center gap-3">
            <div className="rounded-full ring-2 ring-yellow-400">
              <Avatar
                img={`https://a.ppy.sh/${team.captain_id}`}
                rounded
                size="md"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-white">
                {mockPlayers[team.captain_id]?.username}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {mockPlayers[team.captain_id]?.rank}
              </div>
            </div>
          </div>
          {/* Other Players */}
          {team.player_ids
            ?.filter((id) => id !== team.captain_id)
            .map((playerId) => (
              <div key={playerId} className="flex items-center gap-3">
                <Avatar
                  img={`https://a.ppy.sh/${playerId}`}
                  rounded
                  size="md"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {mockPlayers[playerId]?.username}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {mockPlayers[playerId]?.rank}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Expand/Collapse Icon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="rounded-full bg-white p-0.5 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
          {isExpanded ? (
            <HiChevronUp className="size-4 text-gray-500" />
          ) : (
            <HiChevronDown className="size-4 text-gray-500" />
          )}
        </div>
      </div>
    </Card>
  );
}

export function TeamsList() {
  return (
    <div className="grid auto-rows-min grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {mockTeams.map((team) => (
        <div key={team.id} className="self-start">
          <TeamCard team={team} />
        </div>
      ))}
    </div>
  );
}
