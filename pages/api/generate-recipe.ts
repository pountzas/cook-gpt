import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

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

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'No response from OpenAI', retryAfter: 60 });
    }

    res.status(200).json({ content });
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Contact the administrator at nikos@pountzas.gr',
      });
    }

    if (error.status === 401) {
      return res.status(500).json({ error: 'Invalid API key' });
    }

    if (error.status === 400) {
      return res.status(400).json({ error: 'Invalid request to OpenAI' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
}
