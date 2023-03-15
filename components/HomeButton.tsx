"use client";

import { HomeModernIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import {
  premadeIngredientsAtom,
  premadeInstructionsAtom
} from "../atoms/dataAtom";
import { useRecoilState } from "recoil";

function HomeButton() {
  const [premadeIngredients, setPremadeIngredients] = useRecoilState(
    premadeIngredientsAtom
  );
  const [premadeInstructions, setPremadeInstructions] = useRecoilState(
    premadeInstructionsAtom
  );
  const router = useRouter();

  const handleHomeButton = () => {
    setPremadeIngredients([]);
    setPremadeInstructions([]);
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={handleHomeButton}
      className="pl-8 pt-8 relative "
    >
      <HomeModernIcon className=" absolute -left-[480px] w-8 h-8 text-gray-300 hover:text-gray-400 transition-all ease-in-out" />
    </motion.div>
  );
}

export default HomeButton;
