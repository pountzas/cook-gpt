import { cache, cacheSignal } from "react";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Note: OpenAI import needed for the cached function, but client is created inside cache()

// Validate OpenAI API key exists before proceeding
function validateOpenAIKey(): NextResponse | null {
  const apiKey = process.env.CHATGPT_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is not configured. Please set CHATGPT_API_KEY environment variable.",
      },
      { status: 500 }
    );
  }
  return null;
}

// Cache the OpenAI API calls for automatic deduplication
// React's cache() automatically deduplicates identical requests based on stable primitives
const generateRecipeCached = cache(async (prompt: string, apiKey: string) => {
  // Create OpenAI client inside cached function using stable apiKey
  const openai = new OpenAI({ apiKey });

  const recipePrompt = `${process.env.MESSAGE_PROMPT} ${prompt}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: recipePrompt,
      },
    ],
    max_tokens: 2048,
    temperature: 0.9,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });

  return response.choices[0]?.message?.content;
});

// Example of cacheSignal() usage with fetch - for demonstration
// cacheSignal() allows cleanup when cache expires
const fetchWithCacheSignal = cache(
  async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      signal: cacheSignal(), // AbortSignal that triggers when cache expires
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
);

export async function POST(request: NextRequest) {
  // Validate OpenAI API key before proceeding
  const keyValidationError = validateOpenAIKey();
  if (keyValidationError) {
    return keyValidationError;
  }

  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Use the cached function - identical prompts will be automatically deduplicated
    const content = await generateRecipeCached(
      prompt,
      process.env.CHATGPT_API_KEY!
    );

    if (!content) {
      return NextResponse.json(
        { error: "No response from OpenAI", retryAfter: 60 },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error("OpenAI API error:", error);

    if (error.status === 429) {
      return NextResponse.json(
        {
          error:
            "Rate limit exceeded. Contact the administrator at nikos@pountzas.gr",
        },
        { status: 429 }
      );
    }

    if (error.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 500 });
    }

    if (error.status === 400) {
      return NextResponse.json(
        { error: "Invalid request to OpenAI" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
