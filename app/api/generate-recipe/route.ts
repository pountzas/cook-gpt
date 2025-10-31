import { cache, cacheSignal } from 'react';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

// Cache the OpenAI API calls for automatic deduplication
// React's cache() automatically deduplicates identical requests
const generateRecipeCached = cache(async (prompt: string) => {
  const recipePrompt = `${process.env.MESSAGE_PROMT} ${prompt}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: recipePrompt
      }
    ],
    max_tokens: 2048,
    temperature: 0.9,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"]
  });

  return response.choices[0]?.message?.content;
});

// Example of cacheSignal() usage with fetch - for demonstration
// cacheSignal() allows cleanup when cache expires
const fetchWithCacheSignal = cache(async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    signal: cacheSignal() // AbortSignal that triggers when cache expires
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Use the cached function - identical prompts will be automatically deduplicated
    const content = await generateRecipeCached(prompt);

    if (!content) {
      return NextResponse.json({ error: 'No response from OpenAI', retryAfter: 60 }, { status: 500 });
    }

    return NextResponse.json({ content });
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    if (error.status === 429) {
      return NextResponse.json({
        error: 'Rate limit exceeded. Contact the administrator at nikos@pountzas.gr',
      }, { status: 429 });
    }

    if (error.status === 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 500 });
    }

    if (error.status === 400) {
      return NextResponse.json({ error: 'Invalid request to OpenAI' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
