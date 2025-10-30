import { create } from 'zustand';

interface RecipeStore {
  mainTitle: string;
  premadeIngredients: string[];
  premadeInstructions: string[];
  setMainTitle: (title: string) => void;
  setPremadeIngredients: (ingredients: string[]) => void;
  setPremadeInstructions: (instructions: string[]) => void;
  resetRecipe: () => void;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  mainTitle: 'Recipe Generator',
  premadeIngredients: [],
  premadeInstructions: [],
  setMainTitle: (title: string) => set({ mainTitle: title }),
  setPremadeIngredients: (ingredients: string[]) => set({ premadeIngredients: ingredients }),
  setPremadeInstructions: (instructions: string[]) => set({ premadeInstructions: instructions }),
  resetRecipe: () => set({ 
    mainTitle: 'Recipe Generator',
    premadeIngredients: [],
    premadeInstructions: []
  }),
}));

