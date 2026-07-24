import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
  type CollectionReference,
  type DocumentReference,
  type Query,
} from "firebase/firestore";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

export type Recipe = {
  title: string;
  prompt: string;
  ingredients: string[];
  instructions: string[];
  timesCooked?: number;
  userId?: string;
};

export function userRecipesCollection(email: string): CollectionReference {
  return collection(db, "users", email, "recipes");
}

export function userRecipesQuery(email: string): Query {
  return query(userRecipesCollection(email), orderBy("createdAt", "desc"));
}

export function userRecipeDocRef(
  email: string,
  recipeId: string
): DocumentReference {
  return doc(db, "users", email, "recipes", recipeId);
}

export function useUserRecipes(email: string | null | undefined) {
  return useCollection(email ? userRecipesQuery(email) : null);
}

export function useUserRecipe(
  email: string | null | undefined,
  recipeId: string
) {
  return useDocumentData<Recipe>(
    email
      ? (userRecipeDocRef(email, recipeId) as DocumentReference<Recipe>)
      : null
  );
}

export async function findRecipeIdByPrompt(
  email: string,
  prompt: string
): Promise<string | null> {
  const snapshot = await getDocs(
    query(userRecipesCollection(email), where("prompt", "==", prompt))
  );
  return snapshot.docs[0]?.id ?? null;
}
