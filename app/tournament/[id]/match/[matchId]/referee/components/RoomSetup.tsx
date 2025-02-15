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
  const [showCommandsModal, setShowCommandsModal] = useState(false);

  const makeCommand = `!mp make ${tournamentAcronym}: (${team1Name}) vs (${team2Name})`;

  const commonCommands = {
    settings: "!mp settings",
    start: "!mp start 15",
    abort: "!mp abort",
    close: "!mp close",
  };

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

        {/* Common Commands */}
        <div>
          <h4 className="mb-2 font-bold dark:text-white">Common Commands</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(commonCommands).map(([key, command]) => (
              <Button
                key={key}
                color="light"
                onClick={() => copyToClipboard(command)}
                className="text-left dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                {command}
              </Button>
            ))}
          </div>
        </div>

        {/* All Commands Button */}
        <Button
          onClick={() => setShowCommandsModal(true)}
          className="w-full dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Show All Commands
        </Button>

        {/* Commands Modal */}
        <Modal
          show={showCommandsModal}
          onClose={() => setShowCommandsModal(false)}
          className="dark:bg-gray-800"
        >
          <Modal.Header className="dark:bg-gray-800 dark:text-white">
            All IRC Commands
          </Modal.Header>
          <Modal.Body className="dark:bg-gray-800 dark:text-white">
            <div className="space-y-2">
              <p>!mp make &lt;name&gt; - Creates a tournament room</p>
              <p>!mp invite &lt;username&gt; - Invites a player</p>
              <p>!mp size &lt;size&gt; - Sets slots (1-16)</p>
              <p>!mp set &lt;teammode&gt; [&lt;scoremode&gt;] [&lt;size&gt;]</p>
              <p>!mp map &lt;mapid&gt; [&lt;playmode&gt;]</p>
              <p>!mp mods &lt;mod&gt; [&lt;mod&gt;] ...</p>
              <p>!mp timer [&lt;time&gt;]</p>
              <p>!mp settings - Shows room details</p>
              <p>!mp start [&lt;time&gt;] - Starts match</p>
              <p>!mp abort - Aborts match</p>
              <p>!mp team &lt;username&gt; &lt;colour&gt;</p>
              <p>!mp close - Closes the room</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Card>
  );
}
