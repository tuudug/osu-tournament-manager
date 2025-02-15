"use client";

import { Card } from "flowbite-react";

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
  const colorClasses = {
    red: "border-red-500",
    blue: "border-blue-500",
  };

  return (
    <Card className={`border-l-4 ${colorClasses[team.color]} dark:bg-gray-800`}>
      <div className="space-y-4">
        {/* Team Name and Score */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold dark:text-white">{team.name}</h3>
          <div className="flex items-center gap-4">
            <span className="dark:text-gray-300">Score:</span>
            <span className="min-w-8 text-center text-xl font-bold dark:text-white">
              {team.score}
            </span>
          </div>
        </div>

        {/* Player List */}
        <div className="flex flex-wrap gap-2">
          {team.players.map((player) => (
            <div
              key={player.username}
              className="flex items-center gap-2 rounded bg-gray-50 px-3 py-1.5 dark:bg-gray-700"
            >
              <span className="text-sm dark:text-white">{player.username}</span>
              <span
                className={`size-2 rounded-full ${
                  player.ready ? "bg-green-500" : "bg-gray-300 dark:bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
