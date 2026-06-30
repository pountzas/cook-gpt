"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  collection,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Activity } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRecipeStore } from "../stores/recipeStore";
import { db } from "../firebase";
import { parseRecipeResponse } from "../lib/parseRecipeResponse";

type Props = {
  id: string;
};

function RecipeInput({ id }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [hidden, setHidden] = useState<boolean>(true);
  const [gptError, setGptError] = useState<string>("");
  const [loadingPrompt, setLoadingPrompt] = useState<boolean>(false);
  const { setMainTitle } = useRecipeStore();

  const router = useRouter();
  const { data: session } = useSession();

  const [recipes] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "recipes"),
        orderBy("createdAt", "desc")
      )
  );

  useEffect(() => {
    if (!recipes) return;

    const recipe = recipes.docs.find((recipe) => recipe.id === id);
    if (recipe?.data().title === "") {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [recipes, id]);

  const handlePromtType = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingPrompt(true);
    setGptError("");

    if (!prompt) {
      setLoadingPrompt(false);
      return;
    }

    // when prompt already exist in firebase redirect to the id recipe page and delete the new one
    if (recipes?.docs.find((recipe) => recipe.data().prompt === prompt)) {
      const recipeId = recipes.docs.find(
        (recipe) => recipe.data().prompt === prompt
      )?.id;

      router.replace(`/recipes/${recipeId}`);
      await deleteDoc(doc(db, "users", session?.user?.email!, "recipes", id));
      setLoadingPrompt(false);
      return;
    }

    // if prompt is a url
    if (prompt.includes("https://")) {
      setGptError("URL prompts are not available yet");
      setLoadingPrompt(false);
      return;
    }

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setGptError(
            `Rate limit exceeded. Contact the administrator at nikos@pountzas.gr`
          );
        } else {
          setGptError(
            data.error || "An error occurred while generating the recipe"
          );
        }
        setLoadingPrompt(false);
        return;
      }

      const parsed = parseRecipeResponse(data.content ?? "");
      if (!parsed.ok) {
        setGptError(parsed.error);
        setLoadingPrompt(false);
        return;
      }

      const recipeRef = doc(db, "users", session?.user?.email!, "recipes", id);
      await updateDoc(recipeRef, {
        id,
        title: parsed.recipe.title,
        prompt,
        ingredients: parsed.recipe.ingredients,
        instructions: parsed.recipe.instructions,
      });

      setMainTitle(parsed.recipe.title);
      setLoadingPrompt(false);
    } catch (error) {
      console.error("Error calling API:", error);
      setGptError(
        "Failed to connect to the recipe generation service. Please try again." +
          error
      );
      setLoadingPrompt(false);
    }
  };

  return (
    <Activity mode={hidden ? "hidden" : "visible"}>
      <div className="text-sm w-[50%] text-gray-400 ">
        <div className="rounded-lg shadow-lg bg-gray-700/50">
          <form
            onSubmit={(e) => handlePromtType(e)}
            className="flex p-5 space-x-5"
          >
            <input
              className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
              disabled={!session}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              type="text"
              placeholder="Enter a food name."
            />
            {loadingPrompt ? (
              <p>loading...</p>
            ) : (
              <button
                disabled={!prompt || !session}
                type="submit"
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
              </button>
            )}
          </form>
          <Activity mode={gptError ? "visible" : "hidden"}>
            <div className="px-5 pb-3">
              <p className="text-red-400 text-xs">{gptError}</p>
            </div>
          </Activity>
        </div>
        <p className="pt-1 pl-2 text-[10px]">
          <b>CookGPT 2023</b> is an openAI powered recipe generator.
        </p>
      </div>
    </Activity>
  );
}

export default RecipeInput;
