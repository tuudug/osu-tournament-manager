"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/user-provider";
import { useSession } from "next-auth/react";

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
        const response = await fetch(
          `/api/osu/get-user?id=${session.user?.name}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        user.setUser(userData);
        router.push("/");
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/error");
      }
    };

    fetchUserData();
  }, [session, status, router, user]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>
  );
}
