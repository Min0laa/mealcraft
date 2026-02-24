# MealCraft

AI-powered nutrition coach that generates meal plans and grocery carts tailored to your fitness goals.

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/chat/route.ts   # POST /api/chat — validated, service-layered
│   ├── layout.tsx
│   ├── page.tsx            # Client-side entry point
│   └── globals.css
├── components/             # Presentational components (single responsibility)
│   ├── Header.tsx
│   ├── GoalSelector.tsx
│   ├── ChatWindow.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   └── TypingIndicator.tsx
├── hooks/
│   └── useChat.ts          # Chat state management hook
├── lib/
│   ├── constants.ts        # App config, system prompts, labels
│   ├── env.ts              # Environment variable access
│   └── validation.ts       # Zod schemas for API input validation
├── services/
│   └── mistral.ts          # Mistral AI service layer
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

## Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes, Zod validation
- **AI**: Mistral AI (`mistral-small-latest`)
- **Language**: TypeScript (strict mode)

## Setup

```bash
cp .env.example .env.local
# Add your Mistral API key to .env.local

npm install
npm run dev
```

## API

### POST /api/chat

Request:
```json
{
  "messages": [{ "role": "user", "content": "Give me a meal plan" }],
  "goal": "bulk",
  "locale": "en"
}
```

Response:
```json
{
  "reply": "Breakfast - 150g oats, 30g whey..."
}
```

Validation: Zod schema enforces message length limits, valid goal values, and locale.

## Design Decisions

- **Service layer**: AI calls are abstracted behind `services/mistral.ts`, decoupled from the API route
- **Input validation**: Every API request is validated with Zod before reaching the service layer
- **Component decomposition**: Each component has a single responsibility, props flow down
- **Custom hook**: `useChat` encapsulates all chat state (messages, loading, errors, scrolling)
- **Bilingual**: Full EN/FR support via locale prop, no external i18n library needed for this scope
