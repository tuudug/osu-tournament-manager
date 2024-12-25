"use client";

import { HiMiniCubeTransparent } from "react-icons/hi2";
import { TournamentHeader } from "./components/header";

export default function Tournament() {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="max-w-sm">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-center text-center text-6xl text-black dark:text-white">
              <HiMiniCubeTransparent />
            </div>
            <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TournamentInfo is not available
            </h5>
            <p className="text-center font-normal text-gray-700 dark:text-gray-400">
              Please check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
