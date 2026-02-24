export type FitnessGoal = "bulk" | "cut" | "maintain";
export type Locale = "en" | "fr";
export type ActivityLevel = "sedentary" | "moderate" | "active" | "athlete";

export interface UserProfile {
  weight: number | null;
  height: number | null;
  activityLevel: ActivityLevel | null;
  budget: number | null;
  supermarket: string | null;
  restrictions: string;
}

export interface MealItem {
  food: string;
  portionGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  name: string;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface DailyPlan {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
}

export interface CartItem {
  name: string;
  quantity: string;
  priceEuros: number;
  retailer: string;
}

export interface WeeklyCart {
  items: CartItem[];
  totalPrice: number;
  retailer: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  goal: FitnessGoal;
  locale: Locale;
  profile: UserProfile;
}

export interface ChatResponse {
  reply: string;
}

export interface ApiError {
  error: string;
  details?: string;
}
