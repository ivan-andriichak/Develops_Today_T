import { Recipe } from "./recipes.types";

export interface MealsResponse {
  meals: Recipe[] | null;
}

export interface MealResponse {
  meals: Recipe[] | null;
}
