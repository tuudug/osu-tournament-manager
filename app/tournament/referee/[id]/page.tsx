"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Sidebar from "./components/sidebar";
import PreMatch from "./components/pre-match";
import { useState } from "react";

export default function RefereePage() {
  const session = useSession();
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState("pre-match");

  return (
    <div className="flex min-h-screen dark:bg-gray-800">
      <Sidebar callback={(page) => setCurrentPage(page)} />
      <div className="px-4 py-5 text-white ">
        {currentPage === "pre-match" && <PreMatch />}
        {currentPage === "match" && <div>Match</div>}
        {currentPage === "post-match" && <div>Post-match</div>}
      </div>
    </div>
  );
}
