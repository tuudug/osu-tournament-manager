"use client";

import { Card } from "flowbite-react";

interface MapProps {
  artist: string;
  title: string;
  difficulty: string;
  starRating: number;
  bpm: number;
  length: number;
  cs: number;
  ar: number;
  od: number;
  mapper: string;
  bannerUrl?: string;
}

export default function Map({
  artist,
  title,
  difficulty,
  starRating,
  bpm,
  length,
  cs,
  ar,
  od,
  mapper,
  bannerUrl = "https://placehold.co/600x200",
}: MapProps) {
  // Convert length from seconds to MM:SS format
  const formatLength = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="max-w-sm dark:bg-gray-800">
      <div className="relative">
        <img
          src={bannerUrl}
          alt={`${title} banner`}
          className="h-[100px] w-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <div>
          <h5 className="text-xl font-bold dark:text-white">{title}</h5>
          <p className="text-gray-500 dark:text-gray-400">{artist}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm dark:text-gray-300">
          <div>
            <span className="font-semibold dark:text-white">Difficulty: </span>
            {difficulty}
          </div>
          <div>
            <span className="font-semibold dark:text-white">SR: </span>
            {starRating.toFixed(2)}★
          </div>
          <div>
            <span className="font-semibold dark:text-white">BPM: </span>
            {bpm}
          </div>
          <div>
            <span className="font-semibold dark:text-white">Length: </span>
            {formatLength(length)}
          </div>
          <div>
            <span className="font-semibold dark:text-white">CS: </span>
            {cs}
          </div>
          <div>
            <span className="font-semibold dark:text-white">AR: </span>
            {ar}
          </div>
          <div>
            <span className="font-semibold dark:text-white">OD: </span>
            {od}
          </div>
          <div>
            <span className="font-semibold dark:text-white">Mapper: </span>
            {mapper}
          </div>
        </div>
      </div>
    </Card>
  );
}
