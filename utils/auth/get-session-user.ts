import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";
import { User } from "osu-api-v2-js";
import { getOsuClient } from "@/services/osu/osu-client";
import { jwtDecode } from "jwt-decode";

export async function getSessionUser(): Promise<{
  user: User | null;
  session: Awaited<ReturnType<typeof getServerSession>> | null;
}> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return { user: null, session: null };
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(
        session.accessToken as string,
      );
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, clear the session
        return { user: null, session: null };
      }
    } catch (error) {
      // Handle token decoding errors (e.g., invalid token format)
      console.error("Error decoding access token:", error);
      return { user: null, session: null }; // Clear the session if decoding fails
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
