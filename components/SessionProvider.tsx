"use client";

import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type Props = {
  children: ReactNode;
  session: Session | null;
};

export default function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>;
}
