import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Recipe } from '../../interface/recipes.types';
import { AppConfig } from '../../config/configuration';
import { API_ENDPOINTS } from '../../constants/apiConstants';
import { MealResponse, MealsResponse } from '../../interface/mealResponse';

@Injectable()
export class RecipesService {
  private readonly apiUrl: string;

  constructor(private configService: ConfigService) {
    const { apiUrl } = this.configService.get<AppConfig>('app') || {};
    if (!apiUrl) {
      throw new Error('API_BASE_URL is not defined in configuration');
    }
    this.apiUrl = apiUrl;
  }

  async getRecipes(filter?: {
    ingredient?: string;
    country?: string;
    category?: string;
  }): Promise<Recipe[]> {
    let url = `${this.apiUrl}/${API_ENDPOINTS.SEARCH}`;
    if (filter) {
      if (filter.ingredient) {
        if (!filter.ingredient.trim()) {
          throw new BadRequestException('Ingredient cannot be empty');
        }
        url = `${this.apiUrl}/${API_ENDPOINTS.FILTER_BY_INGREDIENT}${filter.ingredient}`;
      } else if (filter.country) {
        if (!filter.country.trim()) {
          throw new BadRequestException('Country cannot be empty');
        }
        url = `${this.apiUrl}/${API_ENDPOINTS.FILTER_BY_AREA}${filter.country}`;
      } else if (filter.category) {
        if (!filter.category.trim()) {
          throw new BadRequestException('Category cannot be empty');
        }
        url = `${this.apiUrl}/${API_ENDPOINTS.FILTER_BY_CATEGORY}${filter.category}`;
      }
    }

    const response = await axios.get<MealsResponse>(url);
    return response.data.meals || [];
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    if (!id || !id.trim()) {
      throw new BadRequestException('Recipe ID is required');
    }
    const url = `${this.apiUrl}/${API_ENDPOINTS.LOOKUP}${id}`;
    const response = await axios.get<MealResponse>(url);
    return response.data.meals?.[0] || null;
  }
}
