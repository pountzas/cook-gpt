"use client";

import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import RecipeItem from "./RecipeItem";

function RecipeList() {
    const { data: session } = useSession();
    const [recipes, loading, error] = useCollection(
        session &&
            query(collection(db, "users", session.user?.email!, "recipes"), orderBy("createdAt", "desc"))
    );
    return (
        <>
            {recipes?.docs.map((recipe) => (
                <RecipeItem key={recipe.id} id={recipe.id} title={recipe.data().title} />
            ))}
        </>
    );
}

export default RecipeList;