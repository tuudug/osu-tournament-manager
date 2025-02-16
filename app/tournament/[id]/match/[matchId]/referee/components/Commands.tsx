"use client";

import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";

export default function Commands() {
  const [showCommandsModal, setShowCommandsModal] = useState(false);

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
      <h3 className="mb-4 text-xl font-bold dark:text-white">Match Commands</h3>
      <div className="space-y-4">
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
