"use client";

import { Button, Card } from "flowbite-react";

interface PostMatchProps {
  onBackToMatch: () => void;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
}

export default function PostMatch({
  onBackToMatch,
  team1Name,
  team2Name,
  team1Score,
  team2Score,
}: PostMatchProps) {
  const winnerName = team1Score > team2Score ? team1Name : team2Name;

  return (
    <div className="space-y-4">
      <Card className="dark:bg-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold dark:text-white">Match Complete</h2>
          <div className="text-xl dark:text-gray-300">
            Winner:{" "}
            <span className="font-bold dark:text-white">{winnerName}</span>
          </div>
          <div className="text-lg dark:text-gray-300">
            {team1Name} {team1Score} - {team2Score} {team2Name}
          </div>
        </div>
      </Card>

      <Card className="dark:bg-gray-800">
        <div className="flex justify-between">
          <Button
            color="light"
            onClick={onBackToMatch}
            className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Back to Match
          </Button>
          <Button
            color="blue"
            className="dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled
          >
            Submit Results (Coming Soon)
          </Button>
        </div>
      </Card>

      {/* Placeholder for future content */}
      <Card className="dark:bg-gray-800">
        <div className="flex h-48 items-center justify-center">
          <p className="text-center text-gray-500 dark:text-gray-400">
            Additional match statistics and information will be displayed here
          </p>
        </div>
      </Card>
    </div>
  );
}
