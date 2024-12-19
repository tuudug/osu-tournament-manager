"use client";

import { OsuUserProvider } from "@/providers/user-provider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <OsuUserProvider>{children}</OsuUserProvider>
    </SessionProvider>
  );
}
