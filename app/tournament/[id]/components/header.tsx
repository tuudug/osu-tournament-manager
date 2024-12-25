"use client";

import { useUser } from "@/providers/user-provider";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

export function TournamentHeader() {
  const { user } = useUser();
  const params = useParams();
  const tournamentId = params.id;
  const router = useRouter();

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <div className="flex items-center">
          <Button
            color="gray"
            size="sm"
            className="mr-2 flex items-center"
            onClick={() => router.push("/")}
          >
            <HiArrowLeft />
            <div className="ml-1 text-xs">Back to home</div>
          </Button>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={user ? `https://a.ppy.sh/${user?.id}` : "https://a.ppy.sh/1"}
              rounded
            />
          }
        >
          <Dropdown.Header>
            {user && (
              <span className="block text-sm">
                Signed in as {user?.username}
              </span>
            )}
            {!user && <span className="block text-sm">Not signed in</span>}
          </Dropdown.Header>
          {user && (
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          )}
          {!user && (
            <Dropdown.Item
              onClick={() => signIn("osu", { callbackUrl: "/auth" })}
            >
              Sign in
            </Dropdown.Item>
          )}
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          href={`/tournament/${tournamentId}/mappool`}
          active
        >
          Mappool
        </Navbar.Link>
        <div className="cursor-not-allowed text-gray-400">Schedule</div>
        <div className="cursor-not-allowed   text-gray-400">Teams</div>
        <div className="cursor-not-allowed   text-gray-400">Statistics</div>
        <div className="w-[64px]" />
      </Navbar.Collapse>
    </Navbar>
  );
}
