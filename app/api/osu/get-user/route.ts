import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/services/osu/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth/auth-options";
import NodeCache from "node-cache";

// Create cache instance with 24 hour TTL
const playerCache = new NodeCache({ stdTTL: 86400 });

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
    // Check cache first
    const cachedUser = playerCache.get<any>(userId);
    if (cachedUser) {
      return NextResponse.json({ user: cachedUser });
    }

    // If not in cache, fetch from API
    const api = await getOsuClient({ token: session.accessToken });
    const user = await api.getUser(userId);

    // Store in cache
    playerCache.set(userId, user);

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
