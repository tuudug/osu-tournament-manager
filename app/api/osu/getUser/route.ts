import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/utils/osu-client";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = Number(url.searchParams.get("id"));

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user ID query parameter" },
      { status: 400 },
    );
  }

  try {
    const api = await getOsuClient();
    const user = await api.getUser(userId);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
