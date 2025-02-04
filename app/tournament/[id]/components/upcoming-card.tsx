"use client";

import { IoCalendarOutline } from "react-icons/io5";

export function UpcomingCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="rounded-lg bg-purple-100 p-2 text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
          <IoCalendarOutline className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Upcoming Events
        </h3>
      </div>
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tournament Showcase
            </h4>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
              In 2 days
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Join us for an exciting showcase of the tournament format and
            special announcements!
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Qualifier Matches
            </h4>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
              Next week
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            The qualifier matches will begin next week. Make sure your team is
            ready!
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Staff Meeting
            </h4>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-500 dark:bg-purple-900/20 dark:text-purple-400">
              Tomorrow
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Important staff meeting to discuss tournament procedures and
            assignments.
          </p>
        </div>
      </div>
    </div>
  );
}
