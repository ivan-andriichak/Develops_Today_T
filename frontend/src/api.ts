import axios from 'axios';
import { API_BASE_URL } from './config';
import { Recipe } from './types/recipe';

export interface FilterParams {
  ingredient?: string;
  country?: string;
  category?: string;
}

export const api = {
  getRecipes: async (filter?: FilterParams): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (filter?.ingredient) params.set('ingredient', filter.ingredient);
    else if (filter?.country) params.set('country', filter.country);
    else if (filter?.category) params.set('category', filter.category);

    const url = `${API_BASE_URL}/recipes${params.toString() ? `?${params}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  },

  getRecipeById: async (id: string): Promise<Recipe | null> => {
    const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
    return response.data;
  },
};