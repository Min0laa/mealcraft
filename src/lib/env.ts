export function getMistralApiKey(): string | null {
  const key = process.env.MISTRAL_API_KEY;
  if (!key || key === "your_mistral_api_key_here") {
    return null;
  }
  return key;
}
