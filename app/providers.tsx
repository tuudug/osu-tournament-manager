"use client";

import { UserProvider } from "@/providers/user-provider";
import { SessionProvider } from "next-auth/react";
import { UserInitializer } from "./components/user-initializer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        <UserInitializer>{children}</UserInitializer>
      </UserProvider>
    </SessionProvider>
  );
}
