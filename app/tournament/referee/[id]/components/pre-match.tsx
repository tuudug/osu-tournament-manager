"use client";

import { Button, Card, Select, TextInput } from "flowbite-react";
import { HiClipboardCopy } from "react-icons/hi";

export default function PreMatch() {
  return (
    <div className="space-y-4">
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Pre-match
      </h1>
      <CreateRoom />
      <MatchSettings />
      <InvitePlayers />
      <InputInfo />
      <Button className="w-full">Start the match</Button>
    </div>
  );
}

function CreateRoom() {
  return (
    <div>
      <p className="mb-2 text-black dark:text-white">
        1. Create the room using this command
      </p>
      <Card>
        <div className="flex items-center justify-between">
          <code className="mr-4 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
            !mp make OMC2024: (haha) vs (hehe)
          </code>
          <Button color="dark">
            <HiClipboardCopy className="mr-2 size-5" />
            Copy
          </Button>
        </div>
      </Card>
    </div>
  );
}

function MatchSettings() {
  return (
    <div className="space-y-2">
      <p className="mb-2 text-black dark:text-white">
        2. Set the match settings
      </p>
      <Card>
        <div className="flex items-center justify-between">
          <code className="mr-4 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
            !mp set 0 4 4
          </code>
          <Button color="dark">
            <HiClipboardCopy className="mr-2 size-5" />
            Copy
          </Button>
        </div>
      </Card>
    </div>
  );
}

function InvitePlayers() {
  return (
    <div className="space-y-2">
      <p className="mb-2 text-black dark:text-white">
        3. Invite players into the lobby
      </p>
      <Card>
        <div className="flex w-full flex-col">
          {["wang", "tuudug", "sotarks"].map((player) => (
            <div key={player} className="flex items-center justify-between">
              <code className="mr-4 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                !mp invite {player}
              </code>
              <Button color="dark" outline={false}>
                <HiClipboardCopy className="mr-2 size-5" />
                Copy
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function InputInfo() {
  return (
    <div className="space-y-2">
      <p className="mb-2 text-black dark:text-white">
        4. Fill in the match information
      </p>
      <Card>
        <TextInput placeholder="MP Link" />
        <Select>
          <option>First Ban</option>
          <option>Team A</option>
          <option>Team B</option>
        </Select>
        <Select>
          <option>First Pick</option>
          <option>Team A</option>
          <option>Team B</option>
        </Select>
      </Card>
    </div>
  );
}
