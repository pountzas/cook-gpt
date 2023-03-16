"use client";

import { HomeModernIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";
import { motion, spring } from "framer-motion";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={handleHomeButton}
      className="pt-8  "
    >
      <HomeModernIcon className=" absolute left-8 w-8 h-8 text-gray-300 hover:text-gray-400 transition-all ease-in-out" />
    </motion.div>
  );
}

export default HomeButton;
