import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/services/osu/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth-options";
import { OsuMapData } from "@/types/map-data";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const mapId = Number(url.searchParams.get("id"));
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!mapId) {
    return NextResponse.json(
      { error: "Missing map ID query parameter" },
      { status: 400 },
    );
  }

  try {
    const api = await getOsuClient({ token: session.accessToken });
    const response = await api.getBeatmap(mapId);
    const mapData: OsuMapData = {
      artist: response.beatmapset.artist,
      title: response.beatmapset.title,
      difficulty: response.version,
      starRating: response.difficulty_rating,
      bpm: response.bpm,
      length: response.total_length,
      cs: response.cs,
      ar: response.ar,
      od: response.accuracy,
      mapper: response.beatmapset.creator,
      beatmapSetId: response.beatmapset_id,
    };

    return NextResponse.json({ mapData });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
