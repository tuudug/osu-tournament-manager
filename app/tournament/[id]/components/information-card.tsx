"use client";

import { IoInformationCircle } from "react-icons/io5";

export function InformationCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
          <IoInformationCircle className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Information
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Tournament Rules
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Placeholder for tournament rules and guidelines. This section will
            contain important information about match formats, scoring systems,
            and general conduct expectations.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Prize Pool
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Placeholder for prize pool information. Details about rewards,
            distribution, and special prizes will be listed here.
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Staff
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Placeholder for staff information. A list of tournament organizers,
            referees, and other staff members will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
