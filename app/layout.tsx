import "../styles/globals.css";

import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { ReactNode } from "react";

import SessionProvider from "../components/SessionProvider";
import Login from "../components/Login";
import SideBar from "../components/SideBar";

export const metadata: Metadata = {
  title: "cookGPTlimited",
  description:
    "Search for recipes using a hashtag or a post url from social media with the power of openAI",
  keywords: [
    "recipes",
    "food",
    "hashtag",
    "recipe post url",
    "cookGPT",
    "Generate food recipes"
  ],
  creator: "Nikos Pountzas"
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
