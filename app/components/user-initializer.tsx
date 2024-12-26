"use client";

import { useUser } from "@/providers/user-provider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function UserInitializer({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const user = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const initializeUser = async () => {
      if (session && !user.user) {
        try {
          const response = await fetch(`/api/osu/get-own-data`);
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const json = await response.json();
          user.setUser(json.user);
        } catch (error) {
          console.error("Error initializing user:", error);
        }
      }
      setIsInitialized(true);
    };

    initializeUser();
  }, [session, status, user]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
