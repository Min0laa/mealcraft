import { MISTRAL_CONFIG, SYSTEM_PROMPTS } from "@/lib/constants";
import type { ChatMessage, FitnessGoal, Locale, UserProfile } from "@/types";

interface GenerateOptions {
  messages: ChatMessage[];
  goal: FitnessGoal;
  locale: Locale;
  profile: UserProfile;
}

function buildProfileContext(profile: UserProfile, goal: FitnessGoal): string {
  const parts: string[] = [`\n\nUser profile:`];
  parts.push(`- Goal: ${goal}`);
  if (profile.weight) parts.push(`- Weight: ${profile.weight}kg`);
  if (profile.height) parts.push(`- Height: ${profile.height}cm`);
  if (profile.activityLevel) parts.push(`- Activity: ${profile.activityLevel}`);
  if (profile.budget) parts.push(`- Weekly budget: ${profile.budget}€`);
  if (profile.supermarket) parts.push(`- Supermarket: ${profile.supermarket}`);
  if (profile.restrictions) parts.push(`- Restrictions: ${profile.restrictions}`);
  return parts.join("\n");
}

async function callMistral(
  apiKey: string,
  systemPrompt: string,
  messages: ChatMessage[]
): Promise<string> {
  const response = await fetch(MISTRAL_CONFIG.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MISTRAL_CONFIG.model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: MISTRAL_CONFIG.maxTokens,
      temperature: MISTRAL_CONFIG.temperature,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Mistral API returned ${response.status}: ${errorBody}`
    );
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("Mistral API returned an empty response");
  }
  return reply;
}

export async function generateNutritionResponse(
  apiKey: string,
  options: GenerateOptions
): Promise<string> {
  const { messages, goal, locale, profile } = options;
  const systemPrompt =
    SYSTEM_PROMPTS[locale] + buildProfileContext(profile, goal);

  try {
    return await callMistral(apiKey, systemPrompt, messages);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "";
    const isRetryable = msg.includes("502") || msg.includes("503") || msg.includes("429");
    if (isRetryable) {
      await new Promise((r) => setTimeout(r, 1500));
      return await callMistral(apiKey, systemPrompt, messages);
    }
    throw error;
  }
}
