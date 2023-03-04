// "use client";

import "../styles/globals.css";

import Login from "../components/Login";
import SessionProvider from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "cookGPT",
  description:
    "Search for recipies using a hashtag or a post url from social media",
  keywords: ["recipes", "food", "hashtag", "recipie post url", "cookGPT"],
  creator: "Nikos Pountzas"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
