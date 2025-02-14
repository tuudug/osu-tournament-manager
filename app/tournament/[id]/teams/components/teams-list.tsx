"use client";

import { Database } from "@/types/supabase/types";
import { Avatar, Card, Spinner } from "flowbite-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

type Team = Database["public"]["Tables"]["tournament_team"]["Row"];

type Player = {
  id: number;
  username: string;
  statistics: {
    global_rank: number;
  };
};

function usePlayerDetails(playerId: number) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const response = await fetch(`/api/osu/get-user?id=${playerId}`);
        if (!response.ok) throw new Error("Failed to fetch player");
        const data = await response.json();
        setPlayer(data.user);
      } catch (error) {
        console.error(`Error fetching player ${playerId}:`, error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlayer();
  }, [playerId]);

  return { player, isLoading };
}

function PlayerInfo({ playerId }: { playerId: number }) {
  const { player, isLoading } = usePlayerDetails(playerId);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-1 h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  if (!player) {
    return (
      <div>
        <div className="font-medium text-gray-900 dark:text-white">
          Unknown Player
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Rank: N/A
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="font-medium text-gray-900 dark:text-white">
        {player.username}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        #{player.statistics.global_rank.toLocaleString()}
      </div>
    </div>
  );
}

function TeamCard({ team }: { team: Team }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="relative h-auto w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header - Always visible */}
      <div className="flex items-center">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {team.name}
        </h5>
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
              <PlayerInfo playerId={team.captain_id} />
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
                  <PlayerInfo playerId={playerId} />
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
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(`/api/tournament/${params.id}/teams`);
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTeams();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => (
        <div key={team.id} className="self-start">
          <TeamCard team={team} />
        </div>
      ))}
    </div>
  );
}
