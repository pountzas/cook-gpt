"use client";

import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  mainTitleAtom,
  premadeIngredientsAtom,
  premadeInstructionsAtom
} from "../atoms/dataAtom";

type Props = {
  key: number;
  name: string;
  instructions: string[] | void;
  ingredients: string[] | void;
};

function PremadeRecipeItem({ key, name, instructions, ingredients }: Props) {
  const [mainTitle, setMainTitle] = useRecoilState(mainTitleAtom);
  const [premadeIngredients, setPremadeIngredients]: any[] = useRecoilState(
    premadeIngredientsAtom
  );
  const [premadeInstructions, setPremadeInstructions]: any[] = useRecoilState(
    premadeInstructionsAtom
  );

  const router = useRouter();

  const handlePremadePage = () => {
    setMainTitle(name);
    setPremadeIngredients(ingredients);
    setPremadeInstructions(instructions);
    router.push(`/recipes/${key}`);
  };

  return (
    <h2 onClick={handlePremadePage} className="exampleText">
      {name}
    </h2>
  );
}

export default PremadeRecipeItem;
