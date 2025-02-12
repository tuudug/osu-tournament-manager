"use client";

import { IoInformationCircle } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Card } from "flowbite-react";

interface InformationCardProps {
  description: string;
}

export function InformationCard({ description }: InformationCardProps) {
  return (
    <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
            <IoInformationCircle className="size-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Information
          </h3>
        </div>
        <div className="prose prose-sm dark:prose-headings:text-white prose-headings:text-gray-900 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-gray-100 max-w-none text-gray-900 dark:text-gray-100">
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
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </Card>
  );
}
