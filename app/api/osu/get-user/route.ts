import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/utils/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-options";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = Number(url.searchParams.get("id"));
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user ID query parameter" },
      { status: 400 },
    );
  }

  try {
    const api = await getOsuClient({ token: session.accessToken });
    const user = await api.getUser(userId);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
