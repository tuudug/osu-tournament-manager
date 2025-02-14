"use client";

import { useParams } from "next/navigation";
import { TournamentHeader } from "../components/header";
import { useEffect, useState } from "react";
import MappoolSelector from "./components/mappool-selector";
import MapCard from "./components/map-card";
import { useUser } from "@/providers/user-provider";
import MapCardCompact from "./components/map-card-compact";
import { Button, Spinner } from "flowbite-react";

export default function Mappool() {
  const { id } = useParams();
  const [mappools, setMappools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [isCompactView, setIsCompactView] = useState(false);
  const [selectedMaps, setSelectedMaps] = useState<string[]>([]);

  interface MapPoolType {
    id: number;
    maps: Record<
      string,
      Array<{
        id: number;
        beatmap_id: number;
        map_number: number;
        comment: string;
        pooler: string;
        map_data: any;
      }>
    >;
  }
  const [selectedPool, setSelectedPool] = useState<MapPoolType | null>(null);

  useEffect(() => {
    const fetchMappools = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/tournament/mappool?id=${id}`);
        const data = await response.json();
        setMappools(data);
        if (data.length > 0) {
          setSelectedPool(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch mappools:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMappools();
  }, [id]);

  const handlePoolSelect = (poolId: number) => {
    const pool = mappools.find((p) => p.id === poolId);
    setSelectedPool(pool);
  };

  const getPrefixOrder = (prefix: string): number => {
    const order = {
      NM: 0,
      HD: 1,
      HR: 2,
      DT: 3,
      FM: 4,
      TB: 5,
    };
    return order[prefix as keyof typeof order] ?? 999;
  };

  const sortMaps = (maps: any[]) => {
    return [...maps].sort((a, b) => a.map_number - b.map_number);
  };

  const handleMapSelect = (mapId: string) => {
    setSelectedMaps((prev) =>
      prev.includes(mapId)
        ? prev.filter((id) => id !== mapId)
        : [...prev, mapId],
    );
  };

  const EmptyState = () => (
    <div className=" p-8 text-start">
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        No Mappools Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Either you are not logged in, or you do not have access to this
        tournaments mappools.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />

      <div className="container mx-auto max-w-[95%] px-4">
        {isLoading ? (
          <div className="flex h-[calc(100vh-64px)] items-center justify-center">
            <Spinner size="xl" />
          </div>
        ) : !user ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              {mappools.length > 0 && selectedPool && (
                <MappoolSelector
                  pools={mappools}
                  selectedPool={
                    mappools.find((p) => p.id === selectedPool.id) ||
                    mappools[0]
                  }
                  onPoolSelect={handlePoolSelect}
                />
              )}
              <Button
                color="gray"
                size="sm"
                onClick={() => setIsCompactView(!isCompactView)}
              >
                {isCompactView
                  ? "Switch to Normal View"
                  : "Switch to Compact View"}
              </Button>
            </div>

            {selectedPool && (
              <div className="space-y-8">
                {Object.entries(selectedPool.maps)
                  .sort(
                    ([prefixA], [prefixB]) =>
                      getPrefixOrder(prefixA) - getPrefixOrder(prefixB),
                  )
                  .map(([prefix, maps]: [string, any[]]) => (
                    <div key={prefix} className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {prefix === "NM" && "NoMod"}
                        {prefix === "HD" && "Hidden"}
                        {prefix === "HR" && "HardRock"}
                        {prefix === "DT" && "DoubleTime"}
                        {prefix === "FM" && "FreeMod"}
                        {prefix === "TB" && "Tiebreaker"}
                      </h2>
                      <div
                        className={`grid gap-4 ${
                          isCompactView
                            ? "grid-cols-1"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        }`}
                      >
                        {sortMaps(maps).map((map) =>
                          isCompactView ? (
                            <MapCardCompact
                              key={map.id}
                              mapId={map.osu_map_id}
                              identifier={`${prefix}${map.map_number}`}
                              comment={map.comment}
                              pooler={map.pooler}
                              mapData={map.map_data}
                              isSelected={selectedMaps.includes(map.osu_map_id)}
                              onSelect={() => handleMapSelect(map.osu_map_id)}
                            />
                          ) : (
                            <MapCard
                              key={map.id}
                              mapId={map.osu_map_id}
                              identifier={`${prefix}${map.map_number}`}
                              comment={map.comment}
                              pooler={map.pooler}
                              mapData={map.map_data}
                              isSelected={selectedMaps.includes(map.osu_map_id)}
                              onSelect={() => handleMapSelect(map.osu_map_id)}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
