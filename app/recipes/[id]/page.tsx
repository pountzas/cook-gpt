import HomeButton from "../../../components/HomeButton";
import RecipeBody from "../../../components/RecipeBody";
import RecipeInput from "../../../components/RecipeInput";
import RecipeTitle from "../../../components/RecipeTitle";

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  
  return (
    <div className="flex flex-col items-center justify-between h-screen py-8 overflow-hidden relative">
      <HomeButton />
      <RecipeTitle id={id} />
      <RecipeBody id={id} />
      <RecipeInput id={id} />
    </div>
  );
}

export default RecipePage;
