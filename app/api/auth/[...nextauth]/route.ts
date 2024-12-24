import NextAuth, { Session, AuthOptions } from "next-auth";
import OsuProvider from "next-auth/providers/osu";
import { JWT } from "next-auth/jwt";

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
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
