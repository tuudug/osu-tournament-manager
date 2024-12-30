"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { TournamentHeader } from "../components/header";
import MapCard from "./components/map-card";
import MappoolSelector from "./components/mappool-selector";

export default function Mappool() {
  const pools = ["Qualifiers", "Quarterfinals", "Semifinals", "Finals"];
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPool =
    pools[Number(searchParams.get("pool") || "0") - 1] || pools[0];
  const [selectedPool, setSelectedPool] = useState(initialPool);

  const handlePoolSelect = (pool: string) => {
    const poolIndex = pools.indexOf(pool) + 1;
    router.push(`?pool=${poolIndex}`);
    setSelectedPool(pool);
  };

  // Update selected pool when URL changes
  useEffect(() => {
    const poolIndex = Number(searchParams.get("pool") || "0") - 1;
    if (pools[poolIndex]) {
      setSelectedPool(pools[poolIndex]);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />

      <div className="mx-4">
        <MappoolSelector
          pools={pools}
          selectedPool={selectedPool}
          onPoolSelect={handlePoolSelect}
        />

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <MapCard
            identifier="NM1"
            comment="General consistency"
            pooler="-tutuchan812495"
            mapId="4881384"
          />
        </div>
      </div>
    </div>
  );
}
