"use client";

import { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import RoomSetup from "./components/RoomSetup";
import TeamScore from "./components/TeamScore";
import MapPool from "./components/MapPool";
import Commands from "./components/Commands";
import MiscInfo from "./components/MiscInfo";
import PostMatch from "./components/PostMatch";

interface Player {
  username: string;
  ready?: boolean;
}

interface Team {
  name: string;
  score: number;
  players: Player[];
  color: "red" | "blue";
}

interface Map {
  id: string;
  name: string;
  mods?: string[];
}

interface Pick {
  team: string;
  map: Map | null;
  winner: string | null;
}

interface Ban {
  team: string;
  map: Map | null;
}

interface MatchState {
  status: "pre-match" | "in-match" | "post-match";
  mpLink: string;
  wbd: string | null;
  firstPick: string;
  firstBan: string;
  bans: Ban[];
  picks: Pick[];
  team1: Team;
  team2: Team;
}

// Mock data
const mockTeam1Name = "INVEST IN $BTC";
const mockTeam2Name = "yoshispeed";
const mockTournamentAcronym = "GSHT2";
const mockBestOf = 9;

const mockMaps: Map[] = [
  { id: "1", name: "Map 1 (NM1)" },
  { id: "2", name: "Map 2 (NM2)" },
  { id: "3", name: "Map 3 (HD1)", mods: ["HD"] },
  { id: "4", name: "Map 4 (HD2)", mods: ["HD"] },
  { id: "5", name: "Map 5 (DT1)", mods: ["DT"] },
  { id: "6", name: "Map 6 (DT2)", mods: ["DT"] },
  { id: "7", name: "Map 7 (FM)", mods: ["Freemod"] },
];

const mockPlayers: { [key: string]: Player[] } = {
  [mockTeam1Name]: [
    { username: "Player1", ready: true },
    { username: "Player2", ready: false },
    { username: "Player3", ready: true },
    { username: "Player4", ready: false },
  ],
  [mockTeam2Name]: [
    { username: "Player5", ready: true },
    { username: "Player6", ready: true },
    { username: "Player7", ready: false },
    { username: "Player8", ready: true },
  ],
};

export default function RefereePage() {
  const [matchState, setMatchState] = useState<MatchState>({
    status: "pre-match",
    mpLink: "",
    wbd: null,
    firstPick: mockTeam1Name,
    firstBan: mockTeam1Name,
    bans: [],
    picks: [],
    team1: {
      name: mockTeam1Name,
      score: 0,
      players: mockPlayers[mockTeam1Name],
      color: "red",
    },
    team2: {
      name: mockTeam2Name,
      score: 0,
      players: mockPlayers[mockTeam2Name],
      color: "blue",
    },
  });

  // Calculate scores based on map winners
  useEffect(() => {
    if (matchState.wbd) {
      const wbdTeam = matchState.wbd === mockTeam1Name ? "team1" : "team2";
      const pointsToWin = Math.ceil(mockBestOf / 2);
      setMatchState((prev) => ({
        ...prev,
        [wbdTeam]: { ...prev[wbdTeam], score: pointsToWin },
        status: "post-match",
      }));
      return;
    }

    const team1Wins = matchState.picks.filter(
      (pick) => pick.winner === mockTeam1Name,
    ).length;
    const team2Wins = matchState.picks.filter(
      (pick) => pick.winner === mockTeam2Name,
    ).length;

    setMatchState((prev) => ({
      ...prev,
      team1: { ...prev.team1, score: team1Wins },
      team2: { ...prev.team2, score: team2Wins },
    }));
  }, [matchState.picks, matchState.wbd]);

  const handleMpLinkSet = (mpLink: string) => {
    setMatchState((prev) => ({ ...prev, mpLink }));
  };

  const handleWbdSet = (team: string | null) => {
    setMatchState((prev) => ({ ...prev, wbd: team }));
  };

  const handleFirstPickSet = (team: string) => {
    setMatchState((prev) => ({ ...prev, firstPick: team }));
  };

  const handleFirstBanSet = (team: string) => {
    setMatchState((prev) => ({ ...prev, firstBan: team }));
  };

  const handleMapBan = (banIndex: number, map: Map | null) => {
    setMatchState((prev) => ({
      ...prev,
      bans: [
        ...prev.bans.slice(0, banIndex),
        {
          team: banIndex % 2 === 0 ? mockTeam1Name : mockTeam2Name,
          map,
        },
        ...prev.bans.slice(banIndex + 1),
      ],
    }));
  };

  const handleMapPick = (pickIndex: number, map: Map | null) => {
    setMatchState((prev) => ({
      ...prev,
      picks: [
        ...prev.picks.slice(0, pickIndex),
        {
          team: pickIndex % 2 === 0 ? mockTeam1Name : mockTeam2Name,
          map,
          winner: null,
        },
        ...prev.picks.slice(pickIndex + 1),
      ],
    }));
  };

  const handleWinnerSet = (pickIndex: number, winner: string | null) => {
    setMatchState((prev) => ({
      ...prev,
      picks: prev.picks.map((pick, i) =>
        i === pickIndex ? { ...pick, winner } : pick,
      ),
    }));
  };

  const handleContinueToMatch = () => {
    setMatchState((prev) => ({ ...prev, status: "in-match" }));
  };

  return (
    <div className="min-h-screen space-y-4 bg-white p-4 dark:bg-gray-900">
      {/* Match Status */}
      <Card className="dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold dark:text-white">
              {matchState.status === "pre-match"
                ? "Pre-Match"
                : matchState.status === "in-match"
                  ? "In-Match"
                  : "Post-Match"}
            </h2>
            {matchState.status === "in-match" && (
              <Button
                color="light"
                size="sm"
                onClick={() =>
                  setMatchState((prev) => ({ ...prev, status: "pre-match" }))
                }
                className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Back to Setup
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <div
              className={`size-3 rounded-full ${
                matchState.status === "pre-match"
                  ? "bg-blue-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
            <div
              className={`size-3 rounded-full ${
                matchState.status === "in-match"
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
            <div
              className={`size-3 rounded-full ${
                matchState.status === "post-match"
                  ? "bg-red-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          </div>
        </div>
      </Card>

      {matchState.status === "pre-match" ? (
        <div className="space-y-4">
          <RoomSetup
            team1Name={mockTeam1Name}
            team2Name={mockTeam2Name}
            tournamentAcronym={mockTournamentAcronym}
            onMpLinkSet={handleMpLinkSet}
            onWbdSet={handleWbdSet}
            onFirstPickSet={handleFirstPickSet}
            onFirstBanSet={handleFirstBanSet}
            firstPick={matchState.firstPick}
            firstBan={matchState.firstBan}
          />
          <div className="flex justify-end">
            <Button
              size="lg"
              color="blue"
              disabled={!matchState.mpLink}
              onClick={handleContinueToMatch}
              className="dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Continue to Match
            </Button>
          </div>
        </div>
      ) : matchState.status === "in-match" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column: Team Scores */}
            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TeamScore team={matchState.team1} />
                <TeamScore team={matchState.team2} />
              </div>

              {/* Map Pool */}
              <MapPool
                maps={mockMaps}
                team1Name={mockTeam1Name}
                team2Name={mockTeam2Name}
                firstPick={matchState.firstPick}
                firstBan={matchState.firstBan}
                bestOf={mockBestOf}
                bansPerTeam={1}
                bans={matchState.bans}
                picks={matchState.picks}
                onMapBan={handleMapBan}
                onMapPick={handleMapPick}
                onWinnerSet={handleWinnerSet}
              />
            </div>

            {/* Right Column: Commands, Misc Info, and Finish Match */}
            <div className="space-y-4">
              <Commands />
              <MiscInfo />
              {(matchState.team1.score > mockBestOf / 2 ||
                matchState.team2.score > mockBestOf / 2) && (
                <Card className="dark:bg-gray-800">
                  <div className="flex justify-end">
                    <Button
                      color="green"
                      onClick={() =>
                        setMatchState((prev) => ({
                          ...prev,
                          status: "post-match",
                        }))
                      }
                      className="dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Finish Match
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      ) : (
        <PostMatch
          onBackToMatch={() =>
            setMatchState((prev) => ({ ...prev, status: "in-match" }))
          }
          team1Name={matchState.team1.name}
          team2Name={matchState.team2.name}
          team1Score={matchState.team1.score}
          team2Score={matchState.team2.score}
        />
      )}
    </div>
  );
}
