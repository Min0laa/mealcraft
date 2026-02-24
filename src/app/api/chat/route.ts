import { NextRequest, NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validation";
import { generateNutritionResponse } from "@/services/mistral";
import { getMistralApiKey } from "@/lib/env";

export async function POST(request: NextRequest) {
  const apiKey = getMistralApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mistral API key not configured" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const reply = await generateNutritionResponse(apiKey, parsed.data);
    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate response", details: message },
      { status: 502 }
    );
  }
}
