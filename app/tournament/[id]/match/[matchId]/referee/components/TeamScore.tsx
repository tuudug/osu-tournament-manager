"use client";

import { Card } from "flowbite-react";
import { useToast } from "@/app/components/common/toast";

interface Player {
  username: string;
  ready?: boolean;
}

interface Team {
  name: string;
  score: number;
  players: Player[];
  color: "red" | "blue";
}

interface TeamScoreProps {
  team: Team;
}

export default function TeamScore({ team }: TeamScoreProps) {
  const { showToast } = useToast();

  const copyToClipboard = (text: string, playerName: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied invite command for ${playerName}`);
  };

  const colorClasses = {
    red: "border-red-500 dark:border-red-700",
    blue: "border-blue-500 dark:border-blue-700",
  };

  return (
    <Card
      className={`border-l-4 ${colorClasses[team.color]} dark:bg-gray-800 ${team.color === "red" ? "dark:text-red-400" : "dark:text-blue-400"}`}
    >
      <div className="space-y-4">
        {/* Team Name and Score */}
        <div className="flex items-center justify-between">
          <h3
            className={`text-xl font-bold ${team.color === "red" ? "dark:text-red-400" : "dark:text-blue-400"}`}
          >
            {team.name}
          </h3>
          <div className="flex items-center gap-4">
            <span className="dark:text-gray-300">Score:</span>
            <span
              className={`min-w-8 text-center text-xl font-bold ${team.color === "red" ? "dark:text-red-400" : "dark:text-blue-400"}`}
            >
              {team.score}
            </span>
          </div>
        </div>

        {/* Player List */}
        <div className="flex flex-wrap gap-2">
          {team.players.map((player) => (
            <button
              key={player.username}
              onClick={() =>
                copyToClipboard(
                  `!mp invite ${player.username}`,
                  player.username,
                )
              }
              className="group relative flex cursor-pointer items-center overflow-hidden rounded bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="h-full w-1 bg-green-500 dark:bg-green-400" />
              <span className="px-3 py-1.5 text-sm dark:text-white">
                {player.username}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
