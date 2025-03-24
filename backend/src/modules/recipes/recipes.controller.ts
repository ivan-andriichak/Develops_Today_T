import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from '../../interface/recipes.types';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(
    @Query('ingredient') ingredient?: string,
    @Query('country') country?: string,
    @Query('category') category?: string,
  ): Promise<Recipe[]> {
    return this.recipesService.getRecipes({ ingredient, country, category });
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe | null> {
    return this.recipesService.getRecipeById(id);
  }
}
