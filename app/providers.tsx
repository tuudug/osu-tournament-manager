"use client";

import { UserProvider } from "@/providers/user-provider";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { User } from "osu-api-v2-js";

interface ProvidersProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <NextAuthSessionProvider>
      <UserProvider initialUser={initialUser}>{children}</UserProvider>
    </NextAuthSessionProvider>
  );
}
