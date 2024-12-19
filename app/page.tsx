"use client";

import { Button, DarkThemeToggle } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      {session.data ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("osu")}>Sign in!</Button>
      )}
      {session.data && (
        <div>
          <p>Signed in as {session.data.user?.name}</p>
        </div>
      )}
      <DarkThemeToggle />
    </main>
  );
}
