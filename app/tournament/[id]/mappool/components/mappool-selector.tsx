"use client";

import { Database } from "@/types/supabase/types";
import { Button } from "flowbite-react";

interface MappoolSelectorProps {
  pools: Database["public"]["Tables"]["tournament_mappool"]["Row"][];
  selectedPool: Database["public"]["Tables"]["tournament_mappool"]["Row"];
  onPoolSelect: (pool: number) => void;
}

export default function MappoolSelector({
  pools,
  selectedPool,
  onPoolSelect,
}: MappoolSelectorProps) {
  return (
    <div className="relative mb-4">
      <div className="scrollbar-hide overflow-x-auto whitespace-nowrap pb-2">
        <div className="flex space-x-2">
          {pools.map((pool) => (
            <Button
              key={pool.name}
              onClick={() => onPoolSelect(pool.id)}
              color={selectedPool === pool ? "blue" : "gray"}
              size="sm"
              className="shrink-0"
            >
              {pool.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
