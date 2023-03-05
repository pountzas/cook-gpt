import NewRecipe from "./NewRecipe";

function SideBar() {
  return (
    <div className="flex flex-col h-screen p-2 ">
      <div className="flex-1">
        <NewRecipe />
        <div>map recipe selection</div>
      </div>
    </div>
  );
}

export default SideBar;
