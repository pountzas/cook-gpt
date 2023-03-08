import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type RecipeItemProps = {
  id: string;
};

function RecipeItem({ id }: RecipeItemProps) {
  return (
    <Link
      className="flex items-center justify-between px-4 cookRow"
      href={`/recipes/${id}`}
    >
      <div className="space-x-2 fcc">
        <ChatBubbleLeftIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
        <p className="flex-1 hidden text-xs truncate md:inline-flex">
          {"recipe"}
        </p>
      </div>
      <TrashIcon className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-700" />
    </Link>
  );
}

export default RecipeItem;
