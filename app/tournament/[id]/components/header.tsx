"use client";

import { HeaderAvatar } from "@/app/components/avatar";
import { useUser } from "@/providers/user-provider";
import { Button, Navbar } from "flowbite-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

export function TournamentHeader() {
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
        <HeaderAvatar />
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
