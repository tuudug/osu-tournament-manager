"use client";

import { Button, Card, TextInput, Modal, Select } from "flowbite-react";
import { useState } from "react";

interface RoomSetupProps {
  team1Name: string;
  team2Name: string;
  tournamentAcronym: string;
  onMpLinkSet: (mpLink: string) => void;
  onWbdSet: (team: string | null) => void;
  onFirstPickSet: (team: string) => void;
  onFirstBanSet: (team: string) => void;
  firstPick: string;
  firstBan: string;
}

export default function RoomSetup({
  team1Name,
  team2Name,
  tournamentAcronym,
  onMpLinkSet,
  onWbdSet,
  onFirstPickSet,
  onFirstBanSet,
  firstPick,
  firstBan,
}: RoomSetupProps) {
  const [mpLink, setMpLink] = useState("");
  const makeCommand = `!mp make ${tournamentAcronym}: (${team1Name}) vs (${team2Name})`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold dark:text-white">Match Setup</h3>
      <div className="space-y-4">
        {/* Room Creation */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TextInput
              value={makeCommand}
              readOnly
              className="flex-1 dark:bg-gray-700 dark:text-white"
            />
            <Button
              color="blue"
              onClick={() => copyToClipboard(makeCommand)}
              className="dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Copy
            </Button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Copy this command to create the match room
          </div>
        </div>

        {/* MP Link */}
        <div className="flex flex-col gap-2">
          <TextInput
            value={mpLink}
            onChange={(e) => {
              setMpLink(e.target.value);
              onMpLinkSet(e.target.value);
            }}
            placeholder="Enter MP Link"
            className="dark:bg-gray-700 dark:text-white"
          />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Enter the MP link after creating the room
          </div>
        </div>

        {/* First Pick/Ban and WBD Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Select
              value={firstPick}
              onChange={(e) => onFirstPickSet(e.target.value)}
              className="dark:bg-gray-700 dark:text-white"
            >
              <option value={team1Name}>{team1Name}</option>
              <option value={team2Name}>{team2Name}</option>
            </Select>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              First Pick
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Select
              value={firstBan}
              onChange={(e) => onFirstBanSet(e.target.value)}
              className="dark:bg-gray-700 dark:text-white"
            >
              <option value={team1Name}>{team1Name}</option>
              <option value={team2Name}>{team2Name}</option>
            </Select>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              First Ban
            </div>
          </div>
        </div>

        {/* WBD Selection */}
        <div className="flex flex-col gap-2">
          <Select
            onChange={(e) => onWbdSet(e.target.value || null)}
            className="dark:bg-gray-700 dark:text-white"
          >
            <option value="">No WBD</option>
            <option value={team1Name}>{team1Name}</option>
            <option value={team2Name}>{team2Name}</option>
          </Select>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Select team for Win by Default (if applicable)
          </div>
        </div>
      </div>
    </Card>
  );
}
