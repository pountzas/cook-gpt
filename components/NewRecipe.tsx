import { PlusIcon } from "@heroicons/react/24/solid";

function NewRecipe() {
  return (
    <div className="border border-gray-700 rounded-lg cookRow fcc">
      <PlusIcon className="w-4 h-4" />
      <p>New Recipe</p>
    </div>
  );
}

export default NewRecipe;
