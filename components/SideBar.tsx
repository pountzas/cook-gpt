"use client";

import { useSession, signOut } from "next-auth/react";
import NewRecipe from "./NewRecipe";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen p-2 ">
      <div className="flex-1">
        <div>
          <NewRecipe />
          <div>map recipe selection</div>
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          className="w-12 h-12 mx-auto mb-2 rounded-full cursor-pointer"
        />
      )}
    </div>
  );
}

export default SideBar;
