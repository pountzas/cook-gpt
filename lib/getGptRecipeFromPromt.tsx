import { Configuration, OpenAIApi } from "openai";

const getGptRecipeFromPromt = async (prompt: string) => {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const openai = new OpenAIApi(config);
  const cookingPromt = `${process.env.MESSAGE_PROMT} ${prompt}`;

  const response = await openai.createCompletion({
    model: "davinci",
    prompt: cookingPromt,
    maxTokens: 4000,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    stop: ["You:"]
  });

  return response.data.choices[0].text;
};

export default getGptRecipeFromPromt;
