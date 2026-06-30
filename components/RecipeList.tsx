"use client";

import { useSession } from "next-auth/react";
import { useUserRecipes } from "../lib/firebase/recipes";
import RecipeItem from "./RecipeItem";

function RecipeList() {
  const { data: session } = useSession();
  const [recipes] = useUserRecipes(session?.user?.email);

  return (
    <>
      {recipes?.docs.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          title={recipe.data().title}
        />
      ))}
    </>
  );
}

export default RecipeList;
