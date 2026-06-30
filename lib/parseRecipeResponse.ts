export type ParsedRecipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
};

export type ParseRecipeResult =
  | { ok: true; recipe: ParsedRecipe }
  | { ok: false; error: string };

export function parseRecipeResponse(raw: string): ParseRecipeResult {
  if (raw.includes("Error")) {
    return { ok: false, error: "Error in response" };
  }

  const titleMatch = raw.match(/Title: (.*)\n/);
  const title = titleMatch ? titleMatch[1] : "";

  const ingredientsMatch = raw.match(/Ingredients:([\s\S]*?)Instructions/);
  const ingredientsText = ingredientsMatch ? ingredientsMatch[1].trim() : "";
  const ingredients = ingredientsText ? ingredientsText.split("\n") : [];

  const instructionsMatch = raw.match(/Instructions:[\s\S]*/);
  const instructionsText = instructionsMatch
    ? instructionsMatch[0].replace("Instructions:", "").trim()
    : "";
  const instructions = instructionsText ? instructionsText.split("\n") : [];

  if (!title || ingredients.length === 0 || instructions.length === 0) {
    return { ok: false, error: "Could not parse recipe from response" };
  }

  return {
    ok: true,
    recipe: { title, ingredients, instructions },
  };
}
