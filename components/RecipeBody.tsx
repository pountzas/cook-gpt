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

import { motion } from "framer-motion";

type Props = {
  id: string;
};

function RecipeBody({ id }: Props) {
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState<boolean>(false); //
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
    };
  }, []); //

  const [recipes] = useCollection(
    session && query(collection(db, "users", session?.user?.email!, "recipes"))
  );

  return (
    <div className="grid gap-8 pb-8 md:grid-cols-2">
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-6">
        <h3 className="pb-2 text-xl font-semibold text-center text-gray-200">
          Ingredients
        </h3>
        <div className=" p-2 overflow-hidden overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80 max-h-[90%]">
          {premadeIngredients.length == 0
            ? recipes?.docs.map(
                (recipe) =>
                  recipe.id === id &&
                  recipe
                    .data()
                    .ingredients.map((ingredient: string, index: number) => (
                      <motion.div
                        className="flex items-center space-x-2 space-y-1 font-semibold text-gray-300"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                        key={index}
                      >
                        {ingredient !== " " && <p>-</p>}
                        <p>{ingredient}</p>
                      </motion.div>
                    ))
              )
            : premadeIngredients.map((ingredient: string, index: number) => (
                <motion.div
                  className="flex items-center space-x-2 space-y-1 font-semibold text-gray-300"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  key={index}
                >
                  {ingredient !== " " && <p>-</p>}
                  <p>{ingredient}</p>
                </motion.div>
              ))}
        </div>
      </div>
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-6  overflow-hidden">
        <h3 className="pb-2 text-xl font-semibold text-center text-gray-200">
          Instructions
        </h3>
        <div className=" p-2 overflow-hidden overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80 max-h-[90%]">
          {premadeInstructions.length == 0
            ? recipes?.docs.map(
                (recipe) =>
                  recipe.id === id &&
                  recipe
                    .data()
                    .instructions.map((instruction: string, index: number) => (
                      <motion.div
                        className="flex items-center space-x-2 space-y-1 font-semibold text-gray-300"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                        key={index}
                      >
                        {instruction !== " " && <p>-</p>}
                        <p>{instruction}</p>
                      </motion.div>
                    ))
              )
            : premadeInstructions.map((instruction: string, index: number) => (
                <motion.div
                  className="flex space-x-2 space-y-1 font-semibold text-gray-300"
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  key={index}
                >
                  {instruction !== " " && <p className="pt-[2px]">-</p>}
                  <p>{instruction}</p>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default RecipeBody;
