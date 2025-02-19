import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth-options";
import { cookies } from "next/headers";
import { createClient } from "@/services/supabase/server";

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { tournamentId, mappoolId, mapId } = body;

    if (!tournamentId || !mappoolId || !mapId) {
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
        { error: "You are not authorized to delete maps from this tournament" },
        { status: 403 },
      );
    }

    // Delete the map
    const { error } = await supabase
      .from("tournament_mappool_map")
      .delete()
      .eq("id", mapId)
      .eq("mappool_id", mappoolId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to delete map" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting map:", error);
    return NextResponse.json(
      { error: "Failed to delete map" },
      { status: 500 },
    );
  }
}
