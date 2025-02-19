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
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Set the accessToken from the token
      session.accessToken = token.accessToken as string;

      // Ensure user object exists
      if (!session.user) {
        session.user = {};
      }

      // Set the user ID from the token
      session.user.id = token.id as string;

      // Validate access token if it exists
      if (session.accessToken) {
        try {
          const decodedToken: { exp: number } = jwtDecode(session.accessToken);
          if (decodedToken.exp * 1000 < Date.now()) {
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
