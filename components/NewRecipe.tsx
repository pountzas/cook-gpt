"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import {
  mainTitleAtom,
  premadeIngredientsAtom,
  premadeInstructionsAtom
} from "../atoms/dataAtom";

function NewRecipe() {
  const [mainTitle, setMainTitle] = useRecoilState(mainTitleAtom);
  const [premadeIngredients, setPremadeIngredients] = useRecoilState(
    premadeIngredientsAtom
  );
  const [premadeInstructions, setPremadeInstructions] = useRecoilState(
    premadeInstructionsAtom
  );

  const router = useRouter();
  const { data: session } = useSession();

  const createNewRecipe = async () => {
    setMainTitle("New Recipe");
    setPremadeIngredients([]);
    setPremadeInstructions([]);
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "recipes"),
      {
        prompt: "",
        userId: session?.user?.email!,
        title: "",
        ingredients: [],
        instructions: [],
        createdAt: serverTimestamp()
      }
    );

    router.push(`/recipes/${doc.id}`);
  };

  return (
    <div
      onClick={createNewRecipe}
      className="border border-gray-700 rounded-lg cookRow fcc"
    >
      <PlusIcon className="w-4 h-4" />
      <p>New Recipe</p>
    </div>
  );
}

export default NewRecipe;
