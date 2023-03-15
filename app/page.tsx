import { SunIcon } from "@heroicons/react/24/outline";
import { premadeRecipies } from "../lib/premadeRecipies";
import Logo from "../components/Logo";
import PremadeRecipeItem from "../components/PremadeRecipeItem";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <Logo />
      <h1 className="my-20 text-5xl font-bold">cookGPT</h1>

      <div>
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <SunIcon className="w-8 h-8" />
            <h2>Examples</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center ">
            {premadeRecipies.map((recipe) => (
              <PremadeRecipeItem
                key={recipe.id}
                name={recipe.name}
                ingredients={recipe.ingredients}
                instructions={recipe.instructions}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
