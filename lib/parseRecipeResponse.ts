export type ParsedRecipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
};

export type ParseRecipeResult =
  | { ok: true; recipe: ParsedRecipe }
  | { ok: false; error: string };

function splitNonEmptyLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function parseRecipeResponse(raw: string): ParseRecipeResult {
  if (raw.includes("Error")) {
    return { ok: false, error: "Error in response" };
  }

  const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const titleMatch = normalized.match(/Title: (.*)\n/);
  const title = titleMatch ? titleMatch[1].trim() : "";

  const ingredientsMatch = normalized.match(
    /Ingredients:([\s\S]*?)Instructions/
  );
  const ingredientsText = ingredientsMatch ? ingredientsMatch[1].trim() : "";
  const ingredients = ingredientsText
    ? splitNonEmptyLines(ingredientsText)
    : [];

  const instructionsMatch = normalized.match(/Instructions:[\s\S]*/);
  const instructionsText = instructionsMatch
    ? instructionsMatch[0].replace("Instructions:", "").trim()
    : "";
  const instructions = instructionsText
    ? splitNonEmptyLines(instructionsText)
    : [];

  if (!title || ingredients.length === 0 || instructions.length === 0) {
    return { ok: false, error: "Could not parse recipe from response" };
  }

  return {
    ok: true,
    recipe: { title, ingredients, instructions },
  };
}
