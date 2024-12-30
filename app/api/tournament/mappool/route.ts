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
    const query = await supabase
      .from("tournament_mappool")
      .select()
      .eq("tournament_id", tournamentId);
    const mappools = query.data;

    if (!mappools) {
      return NextResponse.json(
        { error: "Failed to retrieve mappools" },
        { status: 500 },
      );
    }

    for (const mappool of mappools) {
      const mapsQuery = await supabase
        .from("tournament_mappool_map")
        .select()
        .eq("mappool_id", mappool.id);
      mappool.maps = mapsQuery.data;
    }
    for (const mappool of mappools) {
      const maps = mappool.maps || [];
      const groupedMaps: { [key: string]: any[] } = {};

      for (const map of maps) {
        const prefix = map.map_prefix;
        if (!groupedMaps[prefix]) {
          groupedMaps[prefix] = [];
        }
        groupedMaps[prefix].push(map);
      }

      mappool.maps = groupedMaps;
    }

    return NextResponse.json(mappools);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
