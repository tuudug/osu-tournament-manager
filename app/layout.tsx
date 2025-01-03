import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DarkThemeToggle, ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "osu! Tournament Manager!",
  description: "osu! Tournament Manager!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <div className="fixed bottom-2 left-2">
          <DarkThemeToggle />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
