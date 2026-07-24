"use client";
import {
  ChatBubbleLeftIcon,
  ListBulletIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { deleteDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userRecipeDocRef } from "../lib/firebase/recipes";
import { useRecipeStore } from "../stores/recipeStore";

type RecipeItemProps = {
  id: string;
  title?: string;
  timesCooked?: number;
};

function RecipeItem({ id, title, timesCooked = 0 }: RecipeItemProps) {
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
    const email = session?.user?.email;
    if (!email) return;

    await deleteDoc(userRecipeDocRef(email, id));
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
      <div className="space-x-2 fcc min-w-0">
        {/* <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        <ListBulletIcon className="w-5 h-5 text-gray-500 cursor-pointer shrink-0" />
        <p className="flex-1 hidden text-xs truncate md:inline-flex">
          {/* {"recipe"} */}
          {title || "New Recipe"}
        </p>
        {timesCooked > 0 && (
          <span className="hidden md:inline-flex shrink-0 text-[10px] font-semibold text-[#11A37F] bg-[#11A37F]/15 px-1.5 py-0.5 rounded">
            {timesCooked}×
          </span>
        )}
      </div>
      <TrashIcon
        onClick={removeRecipe}
        className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-700"
      />
    </Link>
  );
}

export default RecipeItem;
