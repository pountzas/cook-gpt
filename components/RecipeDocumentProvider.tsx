"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useUserRecipe, type Recipe } from "../lib/firebase/recipes";

type RecipeDocumentContextValue = {
  id: string;
  email: string | null | undefined;
  recipe: Recipe | undefined;
};

const RecipeDocumentContext = createContext<RecipeDocumentContextValue | null>(
  null
);

type ProviderProps = {
  id: string;
  children: ReactNode;
};

export function RecipeDocumentProvider({ id, children }: ProviderProps) {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [recipe] = useUserRecipe(email, id);

  return (
    <RecipeDocumentContext.Provider value={{ id, email, recipe }}>
      {children}
    </RecipeDocumentContext.Provider>
  );
}

export function useRecipeDocument(): RecipeDocumentContextValue {
  const value = useContext(RecipeDocumentContext);
  if (!value) {
    throw new Error(
      "useRecipeDocument must be used within RecipeDocumentProvider"
    );
  }
  return value;
}
