import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { User } from "osu-api-v2-js";
import { getOsuClient } from "@/services/osu/osu-client";

export async function getSessionUser(): Promise<{
  user: User | null;
  session: Awaited<ReturnType<typeof getServerSession>> | null;
}> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { user: null, session: null };
    }

    // Get user data directly using osu client instead of going through our API
    const client = await getOsuClient({ token: session.accessToken });
    const user = await client.getResourceOwner();

    return { user, session };
  } catch (error) {
    console.error("Error fetching session user:", error);
    return { user: null, session: null };
  }
}
