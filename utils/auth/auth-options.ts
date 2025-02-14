import OsuProvider from "@/services/osu/osu-provider";
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  providers: [
    OsuProvider({
      clientId: process.env.OSU_CLIENT_ID || "",
      clientSecret: process.env.OSU_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) {
        try {
          const decodedToken: { exp: number } = jwtDecode(
            token.accessToken as string,
          );
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired, return an empty session
            return {} as Session;
          }
        } catch (error) {
          // Handle token decoding errors (e.g., invalid token format)
          console.error("Error decoding access token:", error);
          return {} as Session; // Return empty session if decoding fails
        }
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};
