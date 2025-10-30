"use client";

import { useRouter } from "next/navigation";
import { useRecipeStore } from "../stores/recipeStore";

type Props = {
  id: number;
  name: string;
  instructions: string[] | void;
  ingredients: string[] | void;
};

function PremadeRecipeItem({ id, name, instructions, ingredients }: Props) {
  const { setMainTitle, setPremadeIngredients, setPremadeInstructions } = useRecipeStore();

  const router = useRouter();

  const handlePremadePage = () => {
    setMainTitle(name);
    setPremadeIngredients(ingredients || []);
    setPremadeInstructions(instructions || []);
    router.push(`/recipes/${id}`);
  };

  return (
    <h2 onClick={handlePremadePage} className="exampleText">
      {name}
    </h2>
  );
}

export default PremadeRecipeItem;
