"use client";

import { SessionProvider } from "next-auth/react";
import { OsuUserProvider } from "./providers/user-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OsuUserProvider>{children}</OsuUserProvider>
    </SessionProvider>
  );
}
