import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/utils/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase/types";

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

      console.log(query);

      if (!data || data.length == 0) {
        return NextResponse.json({ error: "No data" }, { status: 404 });
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
        return NextResponse.json({ error: "No data" }, { status: 404 });
      }

      return NextResponse.json({ data });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}