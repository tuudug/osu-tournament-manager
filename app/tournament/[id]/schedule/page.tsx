"use client";

import { TournamentHeader } from "../components/header";
import { Card, Spinner, Table } from "flowbite-react";
import { HiCalendar } from "react-icons/hi2";
import {
  HiOutlineInformationCircle,
  HiOutlineMap,
  HiOutlinePresentationChartBar,
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiChevronDown,
  HiChevronRight,
} from "react-icons/hi";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface PotentialMatch {
  id: string; // e.g., "52a", "52b"
  date: string;
  team1: string;
  team2: string;
  referee?: string;
  streamer?: string;
  commentator?: string;
}

interface ScheduleItem {
  id: number;
  type: "match" | "event";
  date: string;
  stage: string;

  // For matches
  team1?: string;
  team2?: string;
  referee?: string;
  streamer?: string;
  commentator?: string;
  potentialMatches?: PotentialMatch[]; // For matches with multiple potential schedules

  // For events
  title?: string;
  description?: string;
}

// Temporary mock data until we have the database table
const mockScheduleItems: ScheduleItem[] = [
  {
    id: 1,
    type: "event",
    title: "Registration Period Ends",
    description: "Last chance to register for the tournament!",
    date: "2025-02-13T23:59:00Z",
    stage: "Registration",
  },
  {
    id: 2,
    type: "event",
    title: "Qualifiers Mappool Showcase",
    description: "Detailed overview of mappool for Qualifiers stage",
    date: "2025-02-14T12:00:00Z",
    stage: "Qualifiers",
  },
  {
    id: 3,
    type: "match",
    team1: "Team A",
    team2: "Team B",
    date: "2025-02-14T14:00:00Z",
    stage: "Qualifiers",
    referee: "John Doe",
    streamer: "Jane Smith",
    commentator: "Bob Wilson",
  },
  {
    id: 52,
    type: "match",
    team1: "Winner of Match 48",
    team2: "Winner of Match 49",
    date: "2025-02-22T14:00:00Z",
    stage: "Semi Finals",
    potentialMatches: [
      {
        id: "52a",
        date: "2025-02-22T14:00:00Z",
        team1: "Team A",
        team2: "Team C",
        referee: "Helen Park",
        streamer: "Ian Clark",
      },
      {
        id: "52b",
        date: "2025-02-22T16:00:00Z",
        team1: "Team A",
        team2: "Team D",
        referee: "Helen Park",
        streamer: "Ian Clark",
      },
      {
        id: "52c",
        date: "2025-02-22T18:00:00Z",
        team1: "Team B",
        team2: "Team C",
        referee: "Kevin Lee",
        streamer: "Linda Wang",
      },
      {
        id: "52d",
        date: "2025-02-22T20:00:00Z",
        team1: "Team B",
        team2: "Team D",
        referee: "Kevin Lee",
        streamer: "Linda Wang",
      },
    ],
  },
  {
    id: 53,
    type: "match",
    team1: "Winner of Match 50",
    team2: "Winner of Match 51",
    date: "2025-02-22T16:00:00Z",
    stage: "Semi Finals",
    potentialMatches: [
      {
        id: "53a",
        date: "2025-02-23T14:00:00Z",
        team1: "Team E",
        team2: "Team G",
        referee: "Mike Davis",
      },
      {
        id: "53b",
        date: "2025-02-23T16:00:00Z",
        team1: "Team E",
        team2: "Team H",
        referee: "Mike Davis",
      },
    ],
  },
  {
    id: 4,
    type: "match",
    team1: "Team C",
    team2: "Team D",
    date: "2025-02-14T16:00:00Z",
    stage: "Qualifiers",
    referee: "Alice Brown",
  },
  {
    id: 5,
    type: "event",
    title: "Round of 16 Mappool Release",
    description: "Maps for RO16 stage will be published",
    date: "2025-02-16T15:00:00Z",
    stage: "Round of 16",
  },
  {
    id: 6,
    type: "match",
    team1: "Winners of Group A",
    team2: "Runners-up of Group B",
    date: "2025-02-17T13:00:00Z",
    stage: "Round of 16",
    referee: "Charlie Brown",
    streamer: "David Smith",
    commentator: "Eve Wilson",
  },
  {
    id: 7,
    type: "match",
    team1: "Winners of Group C",
    team2: "Runners-up of Group D",
    date: "2025-02-17T15:00:00Z",
    stage: "Round of 16",
    referee: "Frank Johnson",
    streamer: "Grace Lee",
  },
  {
    id: 8,
    type: "event",
    title: "Quarter Finals Staff Meeting",
    description: "Mandatory meeting for all tournament staff",
    date: "2025-02-20T18:00:00Z",
    stage: "Quarter Finals",
  },
  {
    id: 9,
    type: "event",
    title: "Quarter Finals Mappool Showcase",
    description: "Live showcase with mapping team",
    date: "2025-02-21T16:00:00Z",
    stage: "Quarter Finals",
  },
  {
    id: 10,
    type: "match",
    team1: "TBD",
    team2: "TBD",
    date: "2025-02-22T14:00:00Z",
    stage: "Quarter Finals",
    referee: "Helen Park",
    streamer: "Ian Clark",
    commentator: "Jack Thompson",
  },
  {
    id: 11,
    type: "match",
    team1: "TBD",
    team2: "TBD",
    date: "2025-02-22T16:00:00Z",
    stage: "Quarter Finals",
    referee: "Kevin Lee",
    streamer: "Linda Wang",
    commentator: "Mike Davis",
  },
  {
    id: 12,
    type: "event",
    title: "Semi Finals Draw Show",
    description: "Live drawing of Semi Finals match-ups",
    date: "2025-02-24T15:00:00Z",
    stage: "Semi Finals",
  },
];

const getEventIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("mappool")) {
    return <HiOutlineMap className="size-5" />;
  }
  if (lowerTitle.includes("draw")) {
    return <HiOutlinePresentationChartBar className="size-5" />;
  }
  if (lowerTitle.includes("staff")) {
    return <HiOutlineUserGroup className="size-5" />;
  }
  if (lowerTitle.includes("showcase")) {
    return <HiOutlineVideoCamera className="size-5" />;
  }
  return <HiOutlineInformationCircle className="size-5" />;
};

export default function TournamentSchedule() {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMatches, setExpandedMatches] = useState<Set<number>>(
    new Set(),
  );
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setScheduleItems(mockScheduleItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleMatchExpanded = (matchId: number) => {
    const newExpanded = new Set(expandedMatches);
    if (newExpanded.has(matchId)) {
      newExpanded.delete(matchId);
    } else {
      newExpanded.add(matchId);
    }
    setExpandedMatches(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <TournamentHeader />
      {isLoading ? (
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <Spinner size="xl" />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
                  <HiCalendar className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Schedule
                </h3>
              </div>

              {scheduleItems.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No schedule items
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table hoverable>
                    <Table.Head>
                      <Table.HeadCell>ID</Table.HeadCell>
                      <Table.HeadCell>Date & Time</Table.HeadCell>
                      <Table.HeadCell>Stage</Table.HeadCell>
                      <Table.HeadCell>Team 1</Table.HeadCell>
                      <Table.HeadCell>Team 2</Table.HeadCell>
                      <Table.HeadCell>Referee</Table.HeadCell>
                      <Table.HeadCell>Streamer</Table.HeadCell>
                      <Table.HeadCell>Commentator</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {scheduleItems.map((item) => (
                        <>
                          <Table.Row
                            key={item.id}
                            className={`cursor-pointer bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                              item.type === "event"
                                ? "bg-blue-50/50 dark:bg-blue-900/10"
                                : ""
                            }`}
                            onClick={() => {
                              if (item.type === "match") {
                                if (item.potentialMatches?.length) {
                                  toggleMatchExpanded(item.id);
                                } else {
                                  router.push(
                                    `/tournament/${id}/match/${item.id}`,
                                  );
                                }
                              } else {
                                router.push(
                                  `/tournament/${id}/schedule/${item.id}`,
                                );
                              }
                            }}
                          >
                            {item.type === "match" ? (
                              <>
                                <Table.Cell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {item.potentialMatches?.length ? (
                                      <span className="text-blue-600 dark:text-blue-400">
                                        {expandedMatches.has(item.id) ? (
                                          <HiChevronDown className="size-4" />
                                        ) : (
                                          <HiChevronRight className="size-4" />
                                        )}
                                      </span>
                                    ) : null}
                                    {item.id}
                                  </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                  {formatDate(item.date)}
                                </Table.Cell>
                                <Table.Cell>
                                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                    {item.stage}
                                  </span>
                                </Table.Cell>
                                <Table.Cell className="font-medium">
                                  {item.team1}
                                </Table.Cell>
                                <Table.Cell className="font-medium">
                                  {item.team2}
                                </Table.Cell>
                                <Table.Cell>{item.referee || "-"}</Table.Cell>
                                <Table.Cell>{item.streamer || "-"}</Table.Cell>
                                <Table.Cell>
                                  {item.commentator || "-"}
                                </Table.Cell>
                              </>
                            ) : (
                              <Table.Cell
                                colSpan={8}
                                className="space-y-1.5 bg-blue-50/50 p-3 text-center dark:bg-blue-900/10"
                              >
                                <div className="flex items-center justify-center gap-3">
                                  <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-white">
                                    <HiOutlineClock className="size-4 text-blue-600 dark:text-blue-400" />
                                    {formatDate(item.date)}
                                  </div>
                                  <span className="text-gray-400 dark:text-gray-500">
                                    •
                                  </span>
                                  <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                    <span className="text-blue-600 dark:text-blue-400">
                                      {getEventIcon(item.title || "")}
                                    </span>
                                    {item.title}
                                  </div>
                                </div>
                                {item.description && (
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {item.description}
                                  </p>
                                )}
                              </Table.Cell>
                            )}
                          </Table.Row>
                          {item.type === "match" &&
                            item.potentialMatches?.length &&
                            expandedMatches.has(item.id) && (
                              <Table.Row className="!border-0">
                                <Table.Cell colSpan={8} className="p-0">
                                  <div className="pl-8">
                                    <Table className="w-full text-sm [&_td]:px-3 [&_td]:py-1.5 [&_th]:px-3 [&_th]:py-1.5">
                                      <Table.Head>
                                        <Table.HeadCell className="text-xs font-medium">
                                          ID
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Date & Time
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Team 1
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Team 2
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Referee
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Streamer
                                        </Table.HeadCell>
                                        <Table.HeadCell className="text-xs font-medium">
                                          Commentator
                                        </Table.HeadCell>
                                      </Table.Head>
                                      <Table.Body>
                                        {item.potentialMatches.map(
                                          (potential, index) => (
                                            <Table.Row
                                              key={potential.id}
                                              className={
                                                index % 2 === 0
                                                  ? "bg-white dark:bg-gray-800"
                                                  : "bg-gray-50 dark:bg-gray-800/50"
                                              }
                                            >
                                              <Table.Cell className="font-medium">
                                                {potential.id}
                                              </Table.Cell>
                                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {formatDate(potential.date)}
                                              </Table.Cell>
                                              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                {potential.team1}
                                              </Table.Cell>
                                              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                {potential.team2}
                                              </Table.Cell>
                                              <Table.Cell className="text-gray-700 dark:text-gray-300">
                                                {potential.referee || "-"}
                                              </Table.Cell>
                                              <Table.Cell className="text-gray-700 dark:text-gray-300">
                                                {potential.streamer || "-"}
                                              </Table.Cell>
                                              <Table.Cell className="text-gray-700 dark:text-gray-300">
                                                {potential.commentator || "-"}
                                              </Table.Cell>
                                            </Table.Row>
                                          ),
                                        )}
                                      </Table.Body>
                                    </Table>
                                  </div>
                                </Table.Cell>
                              </Table.Row>
                            )}
                        </>
                      ))}
                    </Table.Body>
                  </Table>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
