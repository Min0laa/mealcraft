export type FitnessGoal = "bulk" | "cut" | "maintain";

export interface UserProfile {
  userId: string;
  goal: FitnessGoal;
  weight: number;
  height: number;
  activityLevel: "sedentary" | "moderate" | "active" | "athlete";
  dietaryRestrictions: string[];
  budget: number;
  preferredRetailer: "carrefour" | "intermarche" | "leclerc";
}

export interface Meal {
  name: string;
  items: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface MealItem {
  food: string;
  portionGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
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
