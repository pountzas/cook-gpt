"use client";

import { collection, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRecoilState } from "recoil";
import {
  premadeIngredientsAtom,
  premadeInstructionsAtom
} from "../atoms/dataAtom";
import { db } from "../firebase";

type Props = {
  id: string;
};

function RecipeBody({ id }: Props) {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [premadeIngredients, setPremadeIngredients] = useRecoilState(
    premadeIngredientsAtom
  );
  const [premadeInstructions, setPremadeInstructions] = useRecoilState(
    premadeInstructionsAtom
  );

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      // setPremadeIngredients([]);
      // setPremadeInstructions([]);
    };
  }, []);

  const [recipes] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "recipes"))
  );

  return (
    <div className="grid gap-8 md:grid-cols-2 pb-8">
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-4">
        {premadeIngredients.length == 0
          ? recipes?.docs.map(
              (recipe) =>
                recipe.id === id &&
                recipe
                  .data()
                  .ingredients.map((ingredient: string, index: number) => (
                    <p className="text-gray-300 font-semibold" key={index}>
                      {ingredient}
                    </p>
                  ))
            )
          : premadeIngredients.map((ingredient: string, index: number) => (
              <p className="text-gray-300 font-semibold" key={index}>
                {ingredient}
              </p>
            ))}
      </div>
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-4">
        {premadeInstructions.length == 0
          ? recipes?.docs.map(
              (recipe) =>
                recipe.id === id &&
                recipe
                  .data()
                  .instructions.map((instruction: string, index: number) => (
                    <p className="text-gray-300 font-semibold" key={index}>
                      {instruction}
                    </p>
                  ))
            )
          : premadeInstructions.map((instruction: string, index: number) => (
              <p className="text-gray-300 font-semibold" key={index}>
                {instruction}
              </p>
            ))}
      </div>
    </div>
  );
}

export default RecipeBody;
