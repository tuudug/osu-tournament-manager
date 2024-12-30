"use client";

import { Button } from "flowbite-react";

interface MappoolSelectorProps {
  pools: string[];
  selectedPool: string;
  onPoolSelect: (pool: string) => void;
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
              key={pool}
              onClick={() => onPoolSelect(pool)}
              color={selectedPool === pool ? "blue" : "gray"}
              size="sm"
              className="shrink-0"
            >
              {pool}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
