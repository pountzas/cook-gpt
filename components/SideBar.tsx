import NewRecipe from "./NewRecipe";
import LogoutButton from "./LogoutButton";
import RecipeList from "./RecipeList";

function SideBar() {
  return (
    <div className="flex flex-col h-screen p-2 ">
      <div className="flex-1">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80">
          <NewRecipe />

          <RecipeList />
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}

export default SideBar;
