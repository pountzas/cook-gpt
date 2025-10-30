
import { useSession } from "next-auth/react";
import NewRecipe from "./NewRecipe";
import RecipeItem from "./RecipeItem";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import LogoutButton from "./LogoutButton";

function SideBar() {
  const { data: session } = useSession();

  const [recipes, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "recipes"),
        orderBy("createdAt", "desc")
      )
  );

  return (
    <div className="flex flex-col h-screen p-2 ">
      <div className="flex-1">
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-track-gray-500 scrollbar-thin scrollbar-thumb-[#202123]/80">
          <NewRecipe />

          {recipes?.docs.map((recipe) => (
            <RecipeItem
              key={recipe.id}
              id={recipe.id}
              title={recipe.data().title}
            />
          ))}
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}

export default SideBar;
