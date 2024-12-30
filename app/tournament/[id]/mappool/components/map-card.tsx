/* eslint-disable @next/next/no-img-element */
"use client";

import { OsuMapData } from "@/types/map-data";
import { Button, Card } from "flowbite-react";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";
import { HiLink } from "react-icons/hi2";

interface MapProps {
  mapId: string;
  identifier: string;
  comment?: string;
  pooler: string;
  mapData?: OsuMapData;
}

export default function MapCard({
  mapId,
  identifier,
  comment,
  pooler,
  mapData,
}: MapProps) {
  const formatLength = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!mapData) {
    return (
      <div className="max-w-md space-y-2">
        <div className="mx-1 flex items-center gap-2 dark:border-gray-700">
          <span className="text-lg font-bold dark:text-white">
            {identifier}
          </span>
          {comment && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {comment}
            </span>
          )}
          <span
            title="Pooler"
            className="ml-auto cursor-help text-sm underline decoration-dotted dark:text-white"
          >
            {pooler}
          </span>
        </div>
        <Card className="dark:bg-gray-800">
          <div className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">
              The current beatmap data has not been loaded yet.
            </p>
            <Button>Fetch data</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md space-y-2">
      <div className="mx-1 flex items-center gap-2 dark:border-gray-700">
        <span className="text-lg font-bold dark:text-white">{identifier}</span>
        {comment && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {comment}
          </span>
        )}
        <span
          title="Pooler"
          className="ml-auto cursor-help text-sm underline decoration-dotted dark:text-white"
        >
          {pooler}
        </span>
      </div>
      <Card className="dark:bg-gray-800">
        <div className="relative">
          <img
            src={`https://assets.ppy.sh/beatmaps/${mapData.beatmapSetId}/covers/cover.jpg`}
            alt={`${mapData.title} by ${mapData.artist}`}
            width={600}
            height={100}
            className="h-[100px] w-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <div>
            <h5 className="text-xl font-bold dark:text-white">
              {mapData.title} [{mapData.difficulty}]
            </h5>
            <p className="text-gray-500 dark:text-gray-400">{mapData.artist}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mapped by {mapData.mapper}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm dark:text-gray-300">
            <div>
              <span className="font-semibold dark:text-white">SR: </span>
              {mapData.starRating.toFixed(2)}★
            </div>
            <div>
              <span className="font-semibold dark:text-white">BPM: </span>
              {mapData.bpm}
            </div>
            <div>
              <span className="font-semibold dark:text-white">Length: </span>
              {formatLength(mapData.length)}
            </div>
            <div>
              <span
                className="mr-1 cursor-help font-semibold underline decoration-dotted dark:text-white"
                title="CS | AR | OD"
              >
                Settings:
              </span>
              {mapData.cs} | {mapData.ar} | {mapData.od}
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <Button
              as="a"
              href={`https://osu.ppy.sh/b/${mapId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2"
            >
              Beatmap Page
            </Button>
            <Button
              color={"pink"}
              as="a"
              href={`osu://b/${mapId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2"
            >
              osu!direct
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
