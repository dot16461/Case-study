export type AiSuggestionParams = {
  topic: string;
  context?: string;
};

async function callZAPI(
  messages: Array<{ role: string; content: string }>,
  model = "glm-4.6"
) {
  const AI_API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;

  if (!AI_API_KEY) {
    throw new Error(
      "API key is not configured. Please set VITE_PUBLIC_API_KEY in your .env file."
    );
  }

  const url = "https://api.z.ai/api/paas/v4/chat/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AI_API_KEY}`,
      "Content-Type": "application/json",
      "Accept-Language": "en-US,en,ar",
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      temperature: 1.0,
    }),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }

  return await response.json();
}

export async function generateSuggestion(
  { topic, context }: AiSuggestionParams,
  signal?: AbortSignal
): Promise<string> {
  const messages = [
    {
      role: "system",
      content:
        "You help citizens write clear, concise descriptions for social support applications. Respond in 2-3 sentences maximum. Use simple language. Focus on facts, not emotions.",
    },
    {
      role: "user",
      content: `${topic}\n${context ? `Context: ${context}` : ""}`.trim(),
    },
  ];

  try {
    const result = await callZAPI(messages, "glm-4.6");
    const message = result?.choices?.[0]?.message;
    const content: string | undefined = message?.content;
    const reasoningContent: string | undefined = message?.reasoning_content;

    if (!content && !reasoningContent) {
      throw new Error("No suggestion returned");
    }

    const suggestion = content || reasoningContent || "";
    return suggestion.trim();
  } catch (error) {
    throw new Error(
      `Failed to generate suggestion: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
