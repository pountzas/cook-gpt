"use client";

import { FireIcon } from "@heroicons/react/24/solid";
import { runTransaction } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { db } from "../firebase";
import { userRecipeDocRef, type Recipe } from "../lib/firebase/recipes";
import { useRecipeStore } from "../stores/recipeStore";
import { useRecipeDocument } from "./RecipeDocumentProvider";

type Props = {
  id: string;
};

const BRAND_GREEN = "#11A37F";

function SteamWisp({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.span
      className="absolute bottom-full left-1/2 w-1.5 h-3 rounded-full bg-[#11A37F]/50"
      style={{ marginLeft: x }}
      initial={{ opacity: 0, y: 0, scaleX: 1 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [-4, -28],
        scaleX: [1, 1.6],
      }}
      transition={{ duration: 0.75, delay, ease: "easeOut" }}
    />
  );
}

function CookedCounter({ id }: Props) {
  const { email, recipe } = useRecipeDocument();
  const { premadeIngredients, premadeInstructions } = useRecipeStore();
  const [saving, setSaving] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const isPremade =
    premadeIngredients.length > 0 || premadeInstructions.length > 0;
  const hasContent =
    !!recipe?.title &&
    ((recipe.ingredients?.length ?? 0) > 0 ||
      (recipe.instructions?.length ?? 0) > 0);
  const timesCooked = recipe?.timesCooked ?? 0;

  if (isPremade || !email || !hasContent) {
    return null;
  }

  const adjustCount = async (delta: 1 | -1) => {
    if (saving) return;

    setSaving(true);
    try {
      let didIncrement = false;

      await runTransaction(db, async (transaction) => {
        const ref = userRecipeDocRef(email, id);
        const snapshot = await transaction.get(ref);
        const current =
          (snapshot.data() as Recipe | undefined)?.timesCooked ?? 0;

        if (delta === -1 && current <= 0) {
          return;
        }

        transaction.update(ref, { timesCooked: current + delta });
        didIncrement = delta === 1;
      });

      if (didIncrement) {
        setBurstKey((key) => key + 1);
      }
    } catch (error) {
      console.error("Failed to update times cooked:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 pb-4">
      <div className="relative flex items-center gap-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => adjustCount(1)}
          className="relative bg-[#11A37F] hover:opacity-80 text-white font-bold px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          <span className="flex items-center gap-2">
            <FireIcon className="w-4 h-4" />
            I cooked this
          </span>

          <AnimatePresence>
            {burstKey > 0 && (
              <motion.span
                key={burstKey}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85 }}
              >
                <SteamWisp delay={0} x={-10} />
                <SteamWisp delay={0.08} x={0} />
                <SteamWisp delay={0.14} x={10} />
                <motion.span
                  className="absolute"
                  initial={{ scale: 0.6, opacity: 0.9 }}
                  animate={{ scale: 1.8, opacity: 0, y: -18 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <FireIcon
                    className="w-5 h-5"
                    style={{ color: BRAND_GREEN }}
                  />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <button
          type="button"
          disabled={saving || timesCooked <= 0}
          onClick={() => adjustCount(-1)}
          className="text-sm text-gray-400 hover:text-gray-200 px-2 py-2 rounded disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Undo
        </button>
      </div>

      <AnimatePresence mode="wait">
        {timesCooked > 0 && (
          <motion.p
            key={timesCooked}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: [0.85, 1.2, 1] }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#11A37F]"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FireIcon className="w-4 h-4" />
            </motion.span>
            Cooked {timesCooked}×
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CookedCounter;
