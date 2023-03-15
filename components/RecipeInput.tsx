"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type Props = {
  id: string;
};

function RecipeInput({ id }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const handlePromtType = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    // if prompt is a url
    if (prompt.includes("https://")) {
    } else {
      // if prompt is a string
    }
  };

  return (
    <div className="text-sm w-[50%] text-gray-400 ">
      <div className="rounded-lg shadow-lg bg-gray-700/50">
        <form onSubmit={(e) => handlePromtType} className="flex p-5 space-x-5">
          <input
            className="flex-1 bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            placeholder="Enter a food name or a URL of a post with a food name."
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
