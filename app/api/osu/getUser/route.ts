import { NextRequest, NextResponse } from "next/server";
import * as osu from "osu-api-v2-js";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const userId = Number(url.searchParams.get("id"));
  const clientId = process.env.OSU_CLIENT_ID;
  const clientSecret = process.env.OSU_CLIENT_SECRET;

  if (!userId) {
    return NextResponse.json(
      { error: "Missing user ID query parameter" },
      { status: 400 },
    );
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Missing OSU client ID or secret" },
      { status: 400 },
    );
  }

  const api = await osu.API.createAsync(Number(clientId), clientSecret);
  const user = await api.getUser(userId);

  return NextResponse.json({ user });
}
