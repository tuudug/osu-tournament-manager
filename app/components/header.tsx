"use client";

import { Navbar } from "flowbite-react";
import { HeaderAvatar } from "./avatar";

export function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
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
        <Navbar.Link href="#" active>
          Tournaments
        </Navbar.Link>
        <Navbar.Link href="https://github.com/tuudug/osu-tournament-manager/">
          Github
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
