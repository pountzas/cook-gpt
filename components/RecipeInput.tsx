"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  collection,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Configuration, OpenAIApi } from "openai";
import { FormEvent, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRecoilState } from "recoil";
import { mainTitleAtom } from "../atoms/dataAtom";
import { db } from "../firebase";
// import getGptRecipeFromPromt from "../lib/getGptRecipeFromPromt";

type Props = {
  id: string;
};

function RecipeInput({ id }: Props) {
  const [prompt, setPrompt] = useState<string>("");
  const [replyFromGpt, setReplyFromGpt] = useState<string | undefined>("");
  const [hidden, setHidden] = useState<boolean>(true);
  const [gptError, setGptError] = useState<boolean>(false);
  const [gptTitle, setGptTitle] = useState<string>("");
  const [gptIngredientsArray, setGptIngredientsArray] = useState<string[]>([]);
  const [gptInstructionsArray, setGptInstructionsArray] = useState<string[]>(
    []
  );
  const [mainTitle, setMainTitle] = useRecoilState(mainTitleAtom);

  const router = useRouter();
  const { data: session } = useSession();

  const [recipes, loading, error] = useCollection(
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
  }, [recipes]);

  const handlePromtType = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    // when prompt allready exist in firebase redirect to the id recipe page and delete the new one
    if (recipes?.docs.find((recipe) => recipe.data().prompt === prompt)) {
      const recipeId = recipes.docs.find(
        (recipe) => recipe.data().prompt === prompt
      )?.id;

      console.log("redirect to recipe page", recipeId);
      router.replace(`/recipes/${recipeId}`);
      await deleteDoc(doc(db, "users", session?.user?.email!, "recipes", id));
      return;
    }

    // if prompt is a url
    if (prompt.includes("https://")) {
    } else {
      const configuration = new Configuration({
        apiKey: process.env.CHATGPT_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      const recipePrompt = `${process.env.MESSAGE_PROMT} ${prompt} `;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: recipePrompt,
        max_tokens: 4000,
        temperature: 0.9,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"]
      });
      console.log(response.data.choices[0].text);
      setReplyFromGpt(response.data.choices[0].text);
    }
  };

  return (
    <div hidden={hidden} className="text-sm w-[50%] text-gray-400 ">
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
            placeholder="Enter a food # or a URL of a post with a food name."
          />

          <button
            disabled={!prompt || !session}
            type="submit"
            className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
          </button>
        </form>
      </div>
      <p className="pt-1 pl-2 text-[10px]">
        <b>CookGPT 2023</b> is an openAI powered recipe generator.
      </p>
    </div>
  );
}

export default RecipeInput;
