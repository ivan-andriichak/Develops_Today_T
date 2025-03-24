import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Recipe } from '../types/recipe';

const RecipeInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRecipe = useCallback(async () => {
    if (!id) return;
    try {
      const recipeData = await api.getRecipeById(id);
      setRecipe(recipeData);
      if (recipeData?.strCategory) {
        const categoryData = await api.getRecipes({ category: recipeData.strCategory });
        setCategoryRecipes(categoryData);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching recipe:', err);
      setError('Failed to load recipe details.');
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  if (!recipe) return <div>Loading...</div>;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((i) => ({
      ingredient: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    }))
    .filter((item) => item.ingredient);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1 }}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{ maxWidth: '300px', float: 'left', marginRight: '20px' }}
        />
        <h1 style={{ textAlign: 'center' }}>{recipe.strMeal}</h1>
        <p
          onClick={() => navigate(`/?country=${recipe.strArea}`)}
          style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
        >
          {recipe.strArea}
        </p>
        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((item, index) => (
            <li
              key={index}
              onClick={() => navigate(`/?ingredient=${item.ingredient}`)}
              style={{ cursor: 'pointer', color: 'blue' }}
            >
              {item.measure} {item.ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ width: '300px', marginLeft: '20px' }}>
        <h3>More {recipe.strCategory} Recipes</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categoryRecipes.map((catRecipe) => (
            <li
              key={catRecipe.idMeal}
              onClick={() => navigate(`/recipe/${catRecipe.idMeal}`)}
              style={{ cursor: 'pointer', padding: '5px', color: 'blue' }}
            >
              {catRecipe.strMeal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeInfoPage;