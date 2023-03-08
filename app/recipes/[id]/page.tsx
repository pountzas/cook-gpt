import RecipeBody from "../../../components/RecipeBody";
import RecipeInput from "../../../components/RecipeInput";

type RecipePageProps = {
  params: {
    id: string;
  };
};

function RecipePage({ params: { id } }: RecipePageProps) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <RecipeBody id={id} />
      <RecipeInput id={id} />
    </div>
  );
}

export default RecipePage;
