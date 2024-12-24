"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import { signOut } from "next-auth/react";

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
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://a.ppy.sh/5145352"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Signed in as tuudug-</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
        </Dropdown>
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
