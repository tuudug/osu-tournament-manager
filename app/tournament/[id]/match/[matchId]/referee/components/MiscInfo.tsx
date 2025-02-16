"use client";

import { Card } from "flowbite-react";

export default function MiscInfo() {
  return (
    <Card className="dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold dark:text-white">Misc Info</h3>
      <div className="space-y-3">
        {/* Links */}
        <div className="space-y-2">
          <div className="flex">
            <span className="w-24 font-medium dark:text-gray-300">
              Forum Post
            </span>
            <a
              href="https://osu.ppy.sh/community/forums/topics/1519318?n=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Link
            </a>
          </div>
          <div className="flex">
            <span className="w-24 font-medium dark:text-gray-300">
              Main Sheet
            </span>
            <a
              href="https://docs.google.com/spreadsheets/d/1Fj8BfIn0bZp1e0qTfjvcr1DtHIO0RiJvcmDlNXWSXgo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Link
            </a>
          </div>
        </div>

        {/* Late Procedures */}
        <div className="flex">
          <span className="w-24 shrink-0 font-medium dark:text-gray-300">
            Late Procedures
          </span>
          <div className="dark:text-white">
            <span className="font-medium">No Bans:</span> 10 Minutes
            <span className="mx-2">|</span>
            <span className="font-medium">FF:</span> 15 Minutes
          </div>
        </div>

        {/* Double Pick */}
        <div className="flex">
          <span className="w-24 font-medium dark:text-gray-300">
            Double Pick Allowed?
          </span>
          <span className="dark:text-white">Yes</span>
        </div>

        {/* Double Ban */}
        <div className="flex">
          <span className="w-24 font-medium dark:text-gray-300">
            Double Ban Allowed?
          </span>
          <span className="dark:text-white">No, except for HDs</span>
        </div>

        {/* Freemod Rules */}
        <div className="flex">
          <span className="w-24 font-medium dark:text-gray-300">
            Freemod Rules
          </span>
          <span className="dark:text-white">No Freemod</span>
        </div>
      </div>
    </Card>
  );
}
