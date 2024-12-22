"use client";

import { Button, Sidebar } from "flowbite-react";
import {
  HiArrowLeft,
  HiArrowSmRight,
  HiOutlineClipboard,
  HiPaperAirplane,
} from "react-icons/hi";

interface RefereeSidebarProps {
  callback: (page: string) => void;
}

export default function RefereeSidebar({ callback }: RefereeSidebarProps) {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiArrowLeft}>Back to tournament</Sidebar.Item>
          <Sidebar.Item
            icon={HiOutlineClipboard}
            onClick={() => callback("pre-match")}
          >
            Pre-match
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiPaperAirplane}
            onClick={() => callback("match")}
          >
            Match
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            onClick={() => callback("post-match")}
          >
            Post-match
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
