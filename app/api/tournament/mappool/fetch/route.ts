import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/utils/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-options";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase/types";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tournamentId = Number(url.searchParams.get("id"));
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!tournamentId) {
    return NextResponse.json(
      { error: "Missing tournament ID query parameter" },
      { status: 400 },
    );
  }

  try {
    const api = await getOsuClient({ token: session.accessToken });

    const { data: mappools } = await supabase
      .from("tournament_mappool")
      .select("id")
      .eq("tournament_id", tournamentId);

    if (!mappools) {
      return NextResponse.json({ error: "No mappools found" }, { status: 404 });
    }

    const { data: maps } = await supabase
      .from("tournament_mappool_map")
      .select("*")
      .in(
        "mappool_id",
        mappools.map((m) => m.id),
      )
      .is("map_data", null);

    if (!maps || maps.length === 0) {
      return NextResponse.json({ message: "No maps need updating" });
    }

    const updates = await Promise.all(
      maps.map(async (map) => {
        const beatmap = await api.getBeatmap(map.osu_map_id);

        const mapData = {
          artist: beatmap.beatmapset.artist,
          title: beatmap.beatmapset.title,
          difficulty: beatmap.version,
          starRating: beatmap.difficulty_rating,
          bpm: beatmap.bpm,
          length: beatmap.total_length,
          cs: beatmap.cs,
          ar: beatmap.ar,
          od: beatmap.accuracy,
          mapper: beatmap.beatmapset.creator,
          beatmapSetId: beatmap.beatmapset_id,
        };

        const { data, error } = await supabase
          .from("tournament_mappool_map")
          .update({ map_data: mapData })
          .eq("id", map.id);

        if (error) throw error;
        return mapData;
      }),
    );

    return NextResponse.json({
      message: `Updated ${updates.length} maps`,
      updates,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch and update map data" },
      { status: 500 },
    );
  }
}
