import {
  ChatBubbleLeftIcon,
  ListBulletIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import {
  mainTitleAtom,
  premadeIngredientsAtom,
  premadeInstructionsAtom
} from "../atoms/dataAtom";

type RecipeItemProps = {
  id: string;
  title?: string;
};

function RecipeItem({ id, title }: RecipeItemProps) {
  const [mainTitle, setMainTitle] = useRecoilState(mainTitleAtom);
  const [premadeIngredients, setPremadeIngredients] = useRecoilState(
    premadeIngredientsAtom
  );
  const [premadeInstructions, setPremadeInstructions] = useRecoilState(
    premadeInstructionsAtom
  );

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

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
