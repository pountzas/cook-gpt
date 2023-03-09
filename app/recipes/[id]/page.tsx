import RecipeBody from "../../../components/RecipeBody";
import RecipeInput from "../../../components/RecipeInput";
import RecipeTitle from "../../../components/RecipeTitle";

type RecipePageProps = {
  params: {
    id: string;
  };
};

function RecipePage({ params: { id } }: RecipePageProps) {
  return (
    <div className="flex flex-col items-center justify-between h-screen py-8 overflow-hidden">
      <RecipeTitle id={id} />
      <RecipeBody id={id} />
      <RecipeInput id={id} />
    </div>
  );
}

export default RecipePage;
