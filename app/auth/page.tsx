"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/user-provider";
import { useSession } from "next-auth/react";
import { User } from "osu-api-v2-js";

export default function AuthPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = useUser();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/osu/get-own-data`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const json = await response.json();
        const data: User = json.user;
        user.setUser(data);
        router.push("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/error");
      }
    };

    fetchUserData();
  }, [session, status, router, user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="flex items-center justify-center gap-2">
        <div className="mt-3 text-white">Signing you in</div>
        <Loader />
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div className="mt-4">
      <svg
        className="mx-auto size-5 animate-spin text-white"
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
