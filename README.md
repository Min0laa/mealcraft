# MealCraft

AI nutrition coach that builds your meal plan **and** your grocery cart.

## The Problem

Nutrition apps tell you what to eat but leave you alone for the hard part — actually buying the food. You end up googling recipes, guessing quantities, and overspending at the store.

## The Solution

Tell the chatbot your goal (bulk, cut, maintenance), your constraints (budget, dietary restrictions), and it handles the rest:

1. **Generates a meal plan** — specific foods, portions in grams, macros, calories per meal
2. **Builds your cart** — weekly shopping list with real prices from French retailers
3. **Adapts over time** — learns what you liked, what you skipped, adjusts next week

## Architecture

```
mealcraft/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/
│   │   │   ├── plan/      # Meal plan generation
│   │   │   ├── cart/      # Cart assembly endpoint
│   │   │   └── chat/      # Conversational coaching
│   │   ├── onboarding/    # Goal + preferences setup
│   │   └── dashboard/     # Plans, cart, history
│   ├── lib/
│   │   ├── planner.ts     # Meal plan engine
│   │   ├── cart.ts        # Cart builder + price fetcher
│   │   ├── macros.ts      # Macro calculator
│   │   ├── mistral.ts     # Mistral AI client
│   │   └── retailers/     # Retailer API adapters
│   │       ├── carrefour.ts
│   │       └── intermarche.ts
│   ├── db/
│   │   └── schema.ts      # Drizzle ORM schema
│   └── types/
│       └── index.ts       # Shared types
├── .env.example
├── package.json
└── README.md
```

## Stack

- **Next.js 14** — App Router, Server Components, API Routes
- **Mistral AI** — Meal plan generation + coaching conversation
- **PostgreSQL + Drizzle ORM** — User profiles, meal history, preferences
- **Retailer APIs** — Price fetching, cart assembly (Carrefour, Intermarché)

## Technical Challenges

1. **Reliable macro calculation** — Food databases are inconsistent. Need cross-referencing.
2. **Real-time pricing** — Retailer prices change daily. Cart must reflect current availability.
3. **Meal variety** — Avoid the "chicken rice broccoli" trap. Generate real variety across a week.
4. **Cultural food preferences** — Dietary restrictions vary by culture. The AI needs context.

## Status

Work in progress. Core prototype available as a [live demo](https://sachamorin.dev/lab/nutrition).

## Run locally

```bash
git clone https://github.com/Min0laa/mealcraft.git
cd mealcraft
cp .env.example .env.local
npm install
npm run dev
```

## License

MIT
