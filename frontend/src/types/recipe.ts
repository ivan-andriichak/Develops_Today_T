export interface Recipe {
  idMeal: string;
  strMeal: string;
  strArea?: string;
  strCategory?: string;
  strInstructions?: string;
  strMealThumb?: string;
  [key: string]: any;
}

export interface FilterValues {
  ingredient?: string;
  country?: string;
  category?: string;
}