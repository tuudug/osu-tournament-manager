"use client";

import { Card, Select } from "flowbite-react";

interface Map {
  id: string;
  name: string;
  mods?: string[];
  category?: string;
}

interface Pick {
  team: string;
  map: Map | null;
  winner: string | null;
}

interface Ban {
  team: string;
  map: Map | null;
}

interface MapPoolProps {
  maps: Map[];
  team1Name: string;
  team2Name: string;
  firstPick: string;
  firstBan: string;
  bestOf: number;
  bansPerTeam: number;
  bans: Ban[];
  picks: Pick[];
  onMapBan: (banIndex: number, map: Map | null) => void;
  onMapPick: (pickIndex: number, map: Map | null) => void;
  onWinnerSet: (pickIndex: number, winner: string | null) => void;
}

export default function MapPool({
  maps,
  team1Name,
  team2Name,
  firstPick,
  firstBan,
  bestOf,
  bansPerTeam,
  bans,
  picks,
  onMapBan,
  onMapPick,
  onWinnerSet,
}: MapPoolProps) {
  const isMapBanned = (map: Map) => bans.some((ban) => ban.map?.id === map.id);
  const isMapPicked = (map: Map) =>
    picks.some((pick) => pick.map?.id === map.id);

  const getBanningTeam = (index: number) => {
    const isFirstBanTeam = index % 2 === 0;
    return isFirstBanTeam
      ? firstBan
      : firstBan === team1Name
        ? team2Name
        : team1Name;
  };

  const getPickingTeam = (index: number) => {
    const isFirstPickTeam = index % 2 === 0;
    return isFirstPickTeam
      ? firstPick
      : firstPick === team1Name
        ? team2Name
        : team1Name;
  };

  return (
    <Card className="dark:bg-gray-800">
      <div className="grid grid-cols-2 gap-8">
        {/* Bans and Picks Column */}
        <div className="space-y-6">
          {/* Bans */}
          <div>
            <h3 className="mb-4 text-xl font-bold dark:text-white">Map Bans</h3>
            <div className="space-y-2">
              {Array.from({ length: bansPerTeam * 2 }).map((_, index) => {
                const banningTeam = getBanningTeam(index);
                const currentBan = bans[index] || {
                  team: banningTeam,
                  map: null,
                };

                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-2 rounded bg-gray-50 p-2 dark:bg-gray-700"
                  >
                    <div className="text-sm font-medium dark:text-white">
                      {banningTeam}
                    </div>
                    <Select
                      value={bans[index]?.map?.id || ""}
                      onChange={(e) => {
                        const map = maps.find((m) => m.id === e.target.value);
                        onMapBan(index, map || null);
                      }}
                      className="dark:bg-gray-600 dark:text-white"
                    >
                      <option value="">Select Map</option>
                      {maps
                        .filter(
                          (map) =>
                            (!isMapBanned(map) && !isMapPicked(map)) ||
                            map.id === currentBan.map?.id,
                        )
                        .map((map) => (
                          <option key={map.id} value={map.id}>
                            {map.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Picks */}
          <div>
            <h3 className="mb-4 text-xl font-bold dark:text-white">
              Map Picks
            </h3>
            <div className="space-y-2">
              {Array.from({ length: bestOf }).map((_, index) => {
                const pickingTeam = getPickingTeam(index);
                const currentPick = picks[index] || {
                  team: pickingTeam,
                  map: null,
                  winner: null,
                };

                return (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 rounded bg-gray-50 p-2 dark:bg-gray-700"
                  >
                    <div className="text-sm font-medium dark:text-white">
                      {pickingTeam}
                    </div>
                    <Select
                      value={currentPick.map?.id || ""}
                      onChange={(e) => {
                        const map = maps.find((m) => m.id === e.target.value);
                        onMapPick(index, map || null);
                      }}
                      className="dark:bg-gray-600 dark:text-white"
                    >
                      <option value="">Select Map</option>
                      {maps
                        .filter(
                          (map) =>
                            (!isMapPicked(map) && !isMapBanned(map)) ||
                            map.id === currentPick.map?.id,
                        )
                        .map((map) => (
                          <option key={map.id} value={map.id}>
                            {map.name}
                          </option>
                        ))}
                    </Select>
                    <Select
                      value={currentPick.winner || ""}
                      onChange={(e) =>
                        onWinnerSet(index, e.target.value || null)
                      }
                      className="dark:bg-gray-600 dark:text-white"
                      disabled={!currentPick.map}
                    >
                      <option value="">Winner</option>
                      <option value={team1Name}>{team1Name}</option>
                      <option value={team2Name}>{team2Name}</option>
                    </Select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pool Column */}
        <div>
          <h3 className="mb-4 text-xl font-bold dark:text-white">Map Pool</h3>
          <div className="space-y-2">
            {maps.map((map) => {
              const isBanned = isMapBanned(map);
              const isPicked = isMapPicked(map);
              const statusClass = isBanned
                ? "bg-red-100 dark:bg-red-900"
                : isPicked
                  ? "bg-green-100 dark:bg-green-900"
                  : "bg-gray-50 dark:bg-gray-700";

              return (
                <div
                  key={map.id}
                  className={`flex items-center justify-between rounded p-2 ${statusClass}`}
                >
                  <div>
                    <div className="font-medium dark:text-white">
                      {map.name}
                    </div>
                    {map.mods && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Mods: {map.mods.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
