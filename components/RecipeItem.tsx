"use client";
import {
  ChatBubbleLeftIcon,
  ListBulletIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRecipeStore } from "../stores/recipeStore";

type RecipeItemProps = {
  id: string;
  title?: string;
};

function RecipeItem({ id, title }: RecipeItemProps) {
  const { mainTitle, setMainTitle, setPremadeIngredients, setPremadeInstructions } = useRecipeStore();

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState<boolean>(false);

  const handleMainTitle = () => {
    setMainTitle(title || "Recipe Generator");
    setPremadeIngredients([]);
    setPremadeInstructions([]);
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname === `/recipes/${id}`);
  }, [pathname]);

  const removeRecipe = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "recipes", id));
    router.replace("/");
  };

  return (
    <Link
      className={`flex items-center justify-between px-4 cookRow ${
        active && "bg-gray-700/50"
      }`}
      href={`/recipes/${id}`}
      onClick={handleMainTitle}
    >
      <div className="space-x-2 fcc">
        {/* <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        <ListBulletIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <p className="flex-1 hidden text-xs truncate md:inline-flex">
          {/* {"recipe"} */}
          {title || "New Recipe"}
        </p>
      </div>
      <TrashIcon
        onClick={removeRecipe}
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-700"
      />
    </Link>
  );
}

export default RecipeItem;
