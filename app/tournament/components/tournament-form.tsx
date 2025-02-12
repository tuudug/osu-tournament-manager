"use client";

import {
  Button,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
  Modal,
} from "flowbite-react";
import { Database } from "@/types/supabase/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "./markdown-guide.css";

type Tournament = Database["public"]["Tables"]["tournament"]["Row"];
type TournamentInsert = Database["public"]["Tables"]["tournament"]["Insert"];

interface TournamentFormProps {
  tournament?: Tournament;
  onSubmit: (data: TournamentInsert) => Promise<void>;
  submitLabel: string;
}

const markdownExample = `# Tournament Rules

## General Rules

### Teams
- Each team must have exactly 4 players
- All players must be within the rank range
- Teams must have a captain and a co-captain

### Match Format
1. Qualifiers: Single lobby, top 32 teams advance
2. Group Stage: 4 teams per group, top 2 advance
   1. Best of 9
   2. 2 bans per team
3. Playoffs: Single elimination bracket
   1. Best of 11
   2. 1 ban per team

## Important Links
- [Tournament Discord](https://discord.gg/example)
- [Mappool Spreadsheet](https://docs.google.com/spreadsheets)

## Schedule
| Stage | Date | Time |
|-------|------|------|
| Registration | Jan 1 | 12:00 UTC |
| Qualifiers | Jan 15 | 14:00 UTC |
| Group Stage | Jan 30 | 16:00 UTC |

> Note: All times are in UTC. Please convert to your local timezone.

## Code of Conduct
\`\`\`
1. Be respectful to all participants
2. Follow referee instructions
3. Be on time for your matches
\`\`\`

---

### Task List
- [x] Read the rules
- [ ] Join Discord server
- [ ] Register your team`;

export function TournamentForm({
  tournament,
  onSubmit,
  submitLabel,
}: TournamentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpenRank, setIsOpenRank] = useState(
    !tournament?.rank_limit_lower && !tournament?.rank_limit_upper,
  );
  const [showMarkdownHelp, setShowMarkdownHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: TournamentInsert = {
      name: formData.get("name") as string,
      acronym: formData.get("acronym") as string,
      description: formData.get("description") as string,
      team_size: parseInt(formData.get("team_size") as string),
      vs_size: parseInt(formData.get("vs_size") as string),
      rank_limit_lower: isOpenRank
        ? null
        : formData.get("rank_limit_lower")
          ? parseInt(formData.get("rank_limit_lower") as string)
          : null,
      rank_limit_upper: isOpenRank
        ? null
        : formData.get("rank_limit_upper")
          ? parseInt(formData.get("rank_limit_upper") as string)
          : null,
    };

    try {
      await onSubmit(data);
      router.push("/tournament");
      router.refresh();
    } catch (error) {
      console.error("Error submitting tournament:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={showMarkdownHelp}
        onClose={() => setShowMarkdownHelp(false)}
        dismissible
        size="4xl"
        theme={{
          root: {
            base: "fixed left-0 right-0 top-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
              on: "flex bg-gray-900/50 dark:bg-gray-900/80",
              off: "hidden",
            },
          },
          content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner:
              "relative max-h-[90vh] rounded-lg bg-white shadow dark:bg-gray-800",
          },
        }}
      >
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Markdown Guide
          </span>
        </Modal.Header>
        <Modal.Body className="max-h-[calc(90vh-8rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-8">
            <div className="prose-sm dark:prose-invert">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Raw Markdown
              </h3>
              <pre className="whitespace-pre-wrap rounded-lg bg-gray-100 p-4 font-mono text-sm text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                {markdownExample}
              </pre>
            </div>
            <div className="prose-sm dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <div className="prose prose-sm dark:prose-headings:text-white prose-headings:text-gray-900 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-gray-100 max-w-none rounded-lg border border-gray-200 p-4 text-gray-900 dark:border-gray-700 dark:text-gray-100">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-bold dark:border-gray-700">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-3 border-b border-gray-200 pb-2 text-xl font-bold dark:border-gray-700">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 text-lg font-bold">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 whitespace-pre-line">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-4 list-inside list-disc space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-4 list-inside list-decimal space-y-1">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="ml-4">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic dark:border-gray-600">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="block overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                        {children}
                      </code>
                    ),
                    hr: () => (
                      <hr className="my-4 border-gray-200 dark:border-gray-700" />
                    ),
                    table: ({ children }) => (
                      <div className="mb-4 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="bg-gray-50 px-4 py-2 text-left font-semibold dark:bg-gray-800">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {markdownExample}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <form className="flex max-w-2xl flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="name"
              value="Tournament Name"
              className="text-gray-900 dark:text-white"
            />
          </div>
          <TextInput
            id="name"
            name="name"
            required
            defaultValue={tournament?.name}
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="acronym"
              value="Tournament Acronym"
              className="text-gray-900 dark:text-white"
            />
          </div>
          <TextInput
            id="acronym"
            name="acronym"
            required
            defaultValue={tournament?.acronym}
            helperText="A short identifier for your tournament (e.g., OWC, MWC)"
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label
              htmlFor="description"
              value="Description"
              className="text-gray-900 dark:text-white"
            />
            <Button
              size="xs"
              color="gray"
              onClick={() => setShowMarkdownHelp(true)}
              type="button"
            >
              <HiQuestionMarkCircle className="mr-1 size-4" />
              Markdown Tips
            </Button>
          </div>
          <Textarea
            id="description"
            name="description"
            rows={8}
            defaultValue={tournament?.description || ""}
            helperText="Supports markdown formatting"
            className="dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="team_size"
                value="Team Size"
                className="text-gray-900 dark:text-white"
              />
            </div>
            <TextInput
              id="team_size"
              name="team_size"
              type="number"
              min={1}
              required
              defaultValue={tournament?.team_size}
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="vs_size"
                value="VS Size"
                className="text-gray-900 dark:text-white"
              />
            </div>
            <TextInput
              id="vs_size"
              name="vs_size"
              type="number"
              min={1}
              required
              defaultValue={tournament?.vs_size}
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Label
              htmlFor="open_rank"
              value="Open Rank"
              className="text-gray-900 dark:text-white"
            />
            <ToggleSwitch
              id="open_rank"
              checked={isOpenRank}
              onChange={setIsOpenRank}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isOpenRank
              ? "Tournament is open to all ranks"
              : "Tournament has rank restrictions"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="rank_limit_lower"
                value="Minimum Rank"
                className={`${
                  isOpenRank
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
              />
            </div>
            <TextInput
              id="rank_limit_lower"
              name="rank_limit_lower"
              type="number"
              defaultValue={tournament?.rank_limit_lower || ""}
              className={`${
                isOpenRank
                  ? "cursor-not-allowed opacity-50"
                  : "dark:border-gray-600 dark:bg-gray-700"
              }`}
              disabled={isOpenRank}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="rank_limit_upper"
                value="Maximum Rank"
                className={`${
                  isOpenRank
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-gray-900 dark:text-white"
                }`}
              />
            </div>
            <TextInput
              id="rank_limit_upper"
              name="rank_limit_upper"
              type="number"
              defaultValue={tournament?.rank_limit_upper || ""}
              className={`${
                isOpenRank
                  ? "cursor-not-allowed opacity-50"
                  : "dark:border-gray-600 dark:bg-gray-700"
              }`}
              disabled={isOpenRank}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading} isProcessing={loading}>
            {submitLabel}
          </Button>
          <Button
            color="gray"
            type="button"
            disabled={loading}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
