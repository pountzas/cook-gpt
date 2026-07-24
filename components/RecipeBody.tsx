"use client";

import { useRecipeStore } from "../stores/recipeStore";
import { useRecipeDocument } from "./RecipeDocumentProvider";

import { motion } from "framer-motion";

type Props = {
  id: string;
};

function RecipeBody(_props: Props) {
  const { premadeIngredients, premadeInstructions } = useRecipeStore();
  const { recipe } = useRecipeDocument();

  const recipeIngredients = recipe?.ingredients ?? [];
  const recipeInstructions = recipe?.instructions ?? [];

  // Use premade if available, otherwise use Firebase data
  const ingredients =
    premadeIngredients.length > 0 ? premadeIngredients : recipeIngredients;
  const instructions =
    premadeInstructions.length > 0 ? premadeInstructions : recipeInstructions;

  return (
    <div className="grid gap-8 pb-8 md:grid-cols-2">
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-6">
        <h3 className="pb-2 text-xl font-semibold text-center text-gray-200">
          Ingredients
        </h3>
        <div className=" p-2 overflow-hidden overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80 max-h-[90%]">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient: string, index: number) => (
              <motion.div
                className="flex items-center space-x-2 space-y-1 font-semibold text-gray-300"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                key={index}
              >
                <p>{ingredient}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No ingredients available</p>
          )}
        </div>
      </div>
      <div className="bg-gray-700/50 shadow-lg rounded-lg h-[50vh] w-[30vw] p-6  overflow-hidden">
        <h3 className="pb-2 text-xl font-semibold text-center text-gray-200">
          Instructions
        </h3>
        <div className=" p-2 overflow-hidden overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80 max-h-[90%]">
          {instructions.length > 0 ? (
            instructions.map((instruction: string, index: number) => (
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
            ))
          ) : (
            <p className="text-gray-400 text-center">No instructions available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeBody;
