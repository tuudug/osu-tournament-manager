"use client";

import { Database } from "@/types/supabase/types";
import { Card, Button } from "flowbite-react";

interface TournamentProps {
  data: Database["public"]["Tables"]["tournament"]["Row"];
}

export default function Tournament({ data }: TournamentProps) {
  return (
    <Card>
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.name}
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <p className="mb-2">
          <span className="font-bold">Team Size:</span> {data.team_size}v
          {data.vs_size}
        </p>
        {data.description && (
          <p className="mb-2">
            <span className="font-bold">Description:</span> {data.description}
          </p>
        )}
        {data.rank_limit_lower && data.rank_limit_upper && (
          <p className="mb-2">
            <span className="font-bold">Rank Range:</span> #
            {data.rank_limit_lower} - #{data.rank_limit_upper}
          </p>
        )}
        <Button color="green" className="mt-4 w-full">
          Go
        </Button>
      </div>
    </Card>
  );
}
