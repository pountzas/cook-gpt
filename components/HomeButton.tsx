"use client";

import { HomeModernIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useRecipeStore } from "../stores/recipeStore";

function HomeButton() {
  const { setPremadeIngredients, setPremadeInstructions } = useRecipeStore();
  const router = useRouter();

  const handleHomeButton = () => {
    setPremadeIngredients([]);
    setPremadeInstructions([]);
    router.push("/");
  };

  return (
    <div className="pt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleHomeButton}
        className="cursor-pointer"
      >
        <HomeModernIcon className=" absolute left-8 w-8 h-8 text-gray-300 hover:text-gray-400 transition-all ease-in-out" />
      </motion.div>
    </div>
  );
}

export default HomeButton;
