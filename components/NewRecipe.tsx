"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useRecipeStore } from "../stores/recipeStore";

function NewRecipe() {
  const { setMainTitle, setPremadeIngredients, setPremadeInstructions } =
    useRecipeStore();

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
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/recipes/${doc.id}`);
  };

  return (
    <div
      onClick={createNewRecipe}
      className="sticky top-0 border border-gray-700 rounded-lg cookRow fcc bg-gray-700"
    >
      <PlusIcon className="w-4 h-4" />
      <p>New Recipe</p>
    </div>
  );
}

export default NewRecipe;
