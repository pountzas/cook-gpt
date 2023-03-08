import {
  ChatBubbleLeftIcon,
  ListBulletIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

type RecipeItemProps = {
  id: string;
};

function RecipeItem({ id }: RecipeItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [recipes] = useCollection(
    collection(db, "users", session?.user?.email!, "recipes")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname === `/recipes/${id}`);
  }, [pathname]);

  return (
    <Link
      className={`flex items-center justify-between px-4 cookRow ${
        active && "bg-gray-700/50"
      }`}
      href={`/recipes/${id}`}
    >
      <div className="space-x-2 fcc">
        {/* <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 cursor-pointer" /> */}
        <ListBulletIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <p className="flex-1 hidden text-xs truncate md:inline-flex">
          {/* {"recipe"} */}
          {recipes?.docs[recipes.docs.length - 1]?.data().title || "New Recipe"}
        </p>
      </div>
      <TrashIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-700" />
    </Link>
  );
}

export default RecipeItem;
