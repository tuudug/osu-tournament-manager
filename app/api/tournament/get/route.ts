import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/services/osu/osu-client";
import { getServerSession } from "next-auth";
import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase/types";
import { authOptions } from "@/utils/auth/auth-options";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const tournamentId = Number(url.searchParams.get("id"));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    if (!tournamentId) {
      const query = await supabase.from("tournament").select();
      const data: Database["public"]["Tables"]["tournament"]["Row"][] | null =
        query.data;

      if (!data || data.length === 0) {
        return NextResponse.json(
          { error: "No tournaments found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ data });
    } else {
      const query = await supabase
        .from("tournament")
        .select()
        .eq("id", tournamentId);
      const data: Database["public"]["Tables"]["tournament"]["Row"] | null =
        query.data ? query.data[0] : null;

      if (!data) {
        return NextResponse.json(
          { error: `Tournament with ID ${tournamentId} not found` },
          { status: 404 },
        );
      }

      return NextResponse.json({ data });
    }
  } catch (error) {
    console.error("Tournament fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Database error occurred";
    return NextResponse.json(
      {
        error: "Failed to fetch tournament data",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
