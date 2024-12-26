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
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-800">
        <div className="flex items-center justify-center gap-2">
          <div className="mt-3 text-black dark:text-white">Loading</div>
          <Loader />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function Loader() {
  return (
    <div className="mt-4">
      <svg
        className="mx-auto size-5 animate-spin text-black dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
}
