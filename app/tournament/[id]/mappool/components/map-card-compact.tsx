/* eslint-disable @next/next/no-img-element */
"use client";

import { OsuMapData } from "@/types/map-data";
import { Button, Card } from "flowbite-react";
import { HiOutlineExternalLink } from "react-icons/hi";

interface MapProps {
  mapId: string;
  identifier: string;
  comment?: string;
  pooler: string;
  mapData?: OsuMapData;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function MapCardCompact({
  mapId,
  identifier,
  comment,
  pooler,
  mapData,
  isSelected,
  onSelect,
}: MapProps) {
  const truncate = (str: string, length: number) => {
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  if (!mapData) {
    return (
      <Card className="flex flex-row items-center justify-between dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <span className="font-bold">{identifier}</span>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
        <Button size="sm">Fetch data</Button>
      </Card>
    );
  }

  return (
    <Card
      className={`dark:bg-gray-800 ${isSelected ? "bg-red-100 dark:bg-red-900/30" : ""} cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={`https://assets.ppy.sh/beatmaps/${mapData.beatmapSetId}/covers/cover.jpg`}
            alt={`${mapData.title} by ${mapData.artist}`}
            className="h-[30px] w-[60px] object-cover"
          />
          <div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-bold dark:text-white">{identifier}</span>
                <a
                  href={`https://osu.ppy.sh/b/${mapId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline dark:text-white"
                  onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                >
                  {truncate(mapData.title, 30)}
                  {" ["}
                  {truncate(mapData.difficulty, 15)}
                  {"]"}
                </a>
                {comment && (
                  <span className="text-xs text-gray-500">({comment})</span>
                )}
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{mapData.starRating.toFixed(2)}★</span>
                <span>{mapData.bpm} BPM</span>
                <span>
                  CS{mapData.cs} AR{mapData.ar} OD{mapData.od}
                </span>
                <span className="italic">{pooler}</span>
              </div>
            </div>
          </div>
        </div>
        <label
          className="flex items-center space-x-2"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="size-4 text-red-600"
          />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Picked/Banned
          </span>
        </label>
      </div>
    </Card>
  );
}
