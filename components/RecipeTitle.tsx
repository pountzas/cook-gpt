"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mainTitleAtom } from "../atoms/dataAtom";
import { motion } from "framer-motion";

type Props = {
  id: string;
};

function RecipeTitle({ id }: Props) {
  const [mainTitle, setMainTitle] = useRecoilState(mainTitleAtom);
  const [headerTitleArray, setHeaderTitleArray] = useState<string[]>([]);
  const [headerTitle, setHeaderTitle] = useState("");

  useEffect(() => {
    setHeaderTitle(mainTitle);
    setHeaderTitleArray(Array.from(headerTitle));
  }, []);

  useEffect(() => {
    setHeaderTitleArray(Array.from(headerTitle));
  }, [headerTitle]);

  useEffect(() => {
    setHeaderTitle("");

    setTimeout(() => {
      setHeaderTitle(mainTitle);
    }, 100);
  }, [mainTitle]);

  return (
    <div className="flex-1">
      {headerTitleArray?.map((letter, index) => {
        return (
          <motion.span
            initial={{ opacity: 0, y: -100, z: -500 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="inline-block text-gray-200 text-2xl font-bold"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        );
      })}
    </div>
  );
}

export default RecipeTitle;
