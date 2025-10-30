"use client";

import { useSession, signOut } from "next-auth/react";
import NewRecipe from "./NewRecipe";
import RecipeItem from "./RecipeItem";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function SideBar() {
  const { data: session } = useSession();

  const [recipes, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "recipes"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="flex flex-col h-screen p-2 ">
      <div className="flex-1">
        <div>
          <NewRecipe />

          {recipes?.docs.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              id={recipe.id}
              title={recipe.data().title}
            />
          ))}
        </div>
      </div>

      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile pic"
          className="w-10 h-10 mx-auto mb-2 rounded-full cursor-pointer"
        />
      )}
    </div>
  );
}

export default SideBar;
