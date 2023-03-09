import "../styles/globals.css";

import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { ReactNode } from "react";

import RecoilRoot from "../components/RecoilRoot";
import SessionProvider from "../components/SessionProvider";
import Login from "../components/Login";
import SideBar from "../components/SideBar";

export const metadata: Metadata = {
  title: "cookGPT",
  description:
    "Search for recipies using a hashtag or a post url from social media",
  keywords: ["recipes", "food", "hashtag", "recipe post url", "cookGPT"],
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
      <head />
      <body>
        <SessionProvider session={session}>
          <RecoilRoot>
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
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
