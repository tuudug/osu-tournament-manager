import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/services/osu/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth-options";
import { cookies } from "next/headers";
import { createClient } from "@/services/supabase/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { tournamentId, mappoolId, mapId, prefix, mapNumber, comment } = body;

    if (!tournamentId || !mappoolId || !mapId || !prefix || !mapNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Check if user is tournament creator or pooler
    const tournamentQuery = await supabase
      .from("tournament")
      .select()
      .eq("id", tournamentId)
      .single();

    if (!tournamentQuery.data) {
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 },
      );
    }

    const tournament = tournamentQuery.data;
    const userId = Number(session.user.id);

    if (
      tournament.host_id !== userId &&
      !tournament.pooler_ids?.includes(userId)
    ) {
      return NextResponse.json(
        { error: "You are not authorized to add maps to this tournament" },
        { status: 403 },
      );
    }

    // Get map data from osu API
    const api = await getOsuClient({ token: session.accessToken });
    const mapData = await api.getBeatmap(mapId);

    // Add map to mappool
    const { data: newMap, error } = await supabase
      .from("tournament_mappool_map")
      .insert({
        mappool_id: mappoolId,
        osu_map_id: mapId,
        map_prefix: prefix,
        map_number: mapNumber,
        comment: comment || null,
        pooler_id: userId,
        map_data: {
          artist: mapData.beatmapset.artist,
          title: mapData.beatmapset.title,
          difficulty: mapData.version,
          starRating: mapData.difficulty_rating,
          bpm: mapData.bpm,
          length: mapData.total_length,
          cs: mapData.cs,
          ar: mapData.ar,
          od: mapData.accuracy,
          mapper: mapData.beatmapset.creator,
          beatmapSetId: mapData.beatmapset_id,
        },
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to add map to mappool" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: newMap });
  } catch (error) {
    console.error("Error adding map:", error);
    return NextResponse.json(
      { error: "Failed to add map to mappool" },
      { status: 500 },
    );
  }
}
