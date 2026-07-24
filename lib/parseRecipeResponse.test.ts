import { parseRecipeResponse } from "./parseRecipeResponse";

const validResponse = `Title: Chicken Parmesan
Ingredients:
2 chicken breasts
1 cup marinara
Instructions:
Bread the chicken
Bake at 375F
`;

describe("parseRecipeResponse", () => {
  it("parses title, ingredients, and instructions", () => {
    const result = parseRecipeResponse(validResponse);

    expect(result).toEqual({
      ok: true,
      recipe: {
        title: "Chicken Parmesan",
        ingredients: ["2 chicken breasts", "1 cup marinara"],
        instructions: ["Bread the chicken", "Bake at 375F"],
      },
    });
  });

  it("returns an error when the response contains Error", () => {
    expect(parseRecipeResponse("Error: something went wrong")).toEqual({
      ok: false,
      error: "Error in response",
    });
  });

  it("returns an error when required sections are missing", () => {
    expect(parseRecipeResponse("Title: Only a title\n")).toEqual({
      ok: false,
      error: "Could not parse recipe from response",
    });
  });

  it("normalizes CRLF endings and drops blank lines", () => {
    const crlfResponse =
      "Title: Pasta\r\nIngredients:\r\n\r\n  noodles  \r\n\r\nsauce\r\nInstructions:\r\n\r\nBoil\r\n\r\n  Drain  \r\n";

    expect(parseRecipeResponse(crlfResponse)).toEqual({
      ok: true,
      recipe: {
        title: "Pasta",
        ingredients: ["noodles", "sauce"],
        instructions: ["Boil", "Drain"],
      },
    });
  });
});
