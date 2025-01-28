"use client";

import { Button } from "flowbite-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaListUl, FaHistory } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoMdPeople, IoMdTrophy } from "react-icons/io";
import { BsCalendarCheck } from "react-icons/bs";
import { SiOsu } from "react-icons/si"; // Add this import
import { IoStatsChart } from "react-icons/io5"; // Add this import
import { Header } from "./components/layout/header";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="min-h-screen dark:bg-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to osu! Tournament Manager
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            A modern solution for managing osu! tournaments
          </p>
          <div className="flex justify-center">
            {!session ? (
              <div className="rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-px">
                <Button
                  color="dark"
                  size="lg"
                  className="flex items-center justify-center gap-2 bg-white text-gray-900 transition-transform hover:scale-[1.02] hover:text-white dark:bg-gray-800 dark:text-white"
                  onClick={() => signIn("osu")}
                >
                  <SiOsu className="mr-2 mt-[2px] text-xl text-pink-500" />
                  Sign in with osu! to get started
                </Button>
              </div>
            ) : (
              <Button size="lg" onClick={() => router.push("/tournament")}>
                View Tournaments
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-16">
          {/* For Players Section */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              For Players
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                type="player"
                icon={FaUserPlus}
                title="Easy Registration"
                description="Sign up for tournaments with just a few clicks. No more Google Form shenanigans!"
              />
              <FeatureCard
                type="player"
                icon={FaListUl}
                title="Unified Information"
                description="Access all tournament information in one place - no more scattered sources across Discord, Challonge, and Google Sheets."
              />
              <FeatureCard
                type="player"
                icon={FaHistory}
                title="Tournament History"
                description="Track your performance across all tournaments hosted on the platform in one convenient location."
                disabled={true}
              />
            </div>
          </div>

          {/* For Hosts Section */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              For Tournament Hosts
            </h2>
            <div className="grid gap-8 md:grid-cols-4">
              <FeatureCard
                type="host"
                icon={MdManageAccounts}
                title="Tournament Management"
                description="Create and manage tournaments with ease. Set team sizes, rank limits, and more."
              />
              <FeatureCard
                type="host"
                icon={IoMdPeople}
                title="Player Registration"
                description="Handle player signups and team formations efficiently."
              />
              <FeatureCard
                type="host"
                icon={BsCalendarCheck}
                title="Schedule Management"
                description="Organize matches and keep track of tournament progress."
              />
              <FeatureCard
                type="host"
                icon={IoStatsChart}
                title="Statistics & Analytics"
                description="Get detailed insights into your tournament with automatically generated statistics and metrics."
                disabled={true}
              />
              <FeatureCard
                type="host"
                icon={SiOsu}
                title="Mappool Management"
                description="Create and organize mappools with integrated beatmap details and statistics."
              />
              <FeatureCard
                type="host"
                icon={IoMdPeople}
                title="Referee Panel"
                description="Manage matches with a dedicated referee panel."
              />
              <FeatureCard
                type="host"
                icon={IoMdPeople}
                title="Staff Management"
                description="Assign and manage tournament staff roles, including referees and commentators."
              />
              <FeatureCard
                type="host"
                icon={IoMdTrophy}
                title="Bracket Generation"
                description="Automatically generate brackets for your tournament. Challonge begone!"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
  type,
  disabled = false,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  type: "player" | "host";
  disabled?: boolean;
}) {
  const gradientClasses = {
    player: disabled
      ? "border-2 border-dashed border-gray-400"
      : "p-[1px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500",
    host: disabled
      ? "border-2 border-dashed border-gray-400"
      : "p-[1px] bg-gradient-to-br from-green-400 via-cyan-500 to-blue-500",
  };

  return (
    <div className={`relative rounded-lg ${gradientClasses[type]}`}>
      {disabled && (
        <div className="absolute -top-2 right-3 z-50 rounded-full bg-white px-2 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          Disabled in alpha
        </div>
      )}
      <div
        className={`h-full rounded-lg bg-white p-6 dark:bg-gray-800 ${
          disabled ? "opacity-60" : ""
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <Icon
            className={`text-2xl ${
              type === "player"
                ? "text-pink-500 dark:text-pink-400"
                : "text-green-500 dark:text-green-400"
            }`}
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
