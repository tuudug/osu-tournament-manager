"use client";

import { HiMiniCubeTransparent } from "react-icons/hi2";
import { TournamentHeader } from "../components/header";
import Map from "./components/map";

export default function Mappool() {
  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      <Map
        artist="Artist Name"
        title="Song Title"
        difficulty="Insane"
        starRating={5.67}
        bpm={180}
        length={123}
        cs={4}
        ar={9}
        od={8}
        mapper="Mapper Name"
        bannerUrl="optional-banner-url"
      />
    </div>
  );
}
