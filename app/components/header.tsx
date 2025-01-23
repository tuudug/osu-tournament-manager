"use client";

import { Navbar } from "flowbite-react";
import { HeaderAvatar } from "./avatar";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { GiTrophy } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

export function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/" as={Link}>
        <div className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            otm!
          </span>
          <span className="ml-1 text-[10px] text-gray-500 dark:text-gray-400">
            alpha!
          </span>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <HeaderAvatar />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" as={Link}>
          <div className="flex items-center gap-2 text-gray-900 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
            <AiFillHome className="text-lg" />
            Home
          </div>
        </Navbar.Link>
        <Navbar.Link href="/tournament" as={Link}>
          <div className="flex items-center gap-2 text-gray-900 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
            <GiTrophy className="text-lg" />
            Tournaments
          </div>
        </Navbar.Link>
        <Navbar.Link href="https://github.com/tuudug/osu-tournament-manager/">
          <div className="flex items-center gap-2 text-gray-900 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
            <FaGithub className="text-lg" />
            Github
          </div>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
