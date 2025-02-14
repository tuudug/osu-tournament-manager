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
      // First set the accessToken from the token
      session.accessToken = token.accessToken as string;

      // Then validate it if it exists
      if (session.accessToken) {
        try {
          const decodedToken: { exp: number } = jwtDecode(session.accessToken);
          if (decodedToken.exp * 1000 < Date.now()) {
            // Only clear if explicitly expired
            session.accessToken = undefined;
          }
        } catch (error) {
          console.error("Error decoding access token:", error);
          session.accessToken = undefined;
        }
      }

      return session;
    },
  },
};
