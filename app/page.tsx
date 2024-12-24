"use client";

import { Button } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Header } from "./components/header";
import { useUser } from "@/providers/user-provider";

export default function Home() {
  const session = useSession();
  const user = useUser();

  console.log(user);

  return (
    <main className="min-h-screen dark:bg-gray-800">
      <Header />
      {session.data ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => signIn("osu", { callbackUrl: "/auth" })}>
          Sign in!
        </Button>
      )}
      {session.data && (
        <div>
          <p>Signed in as {session.data.user?.name}</p>
        </div>
      )}
    </main>
  );
}
