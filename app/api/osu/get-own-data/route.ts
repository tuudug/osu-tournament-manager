import { NextRequest, NextResponse } from "next/server";
import { getOsuClient } from "@/utils/osu-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth-options";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await getOsuClient({ token: session.accessToken });
    const user = await client.getResourceOwner();
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to initialize osu! client" },
      { status: 500 },
    );
  }
}
