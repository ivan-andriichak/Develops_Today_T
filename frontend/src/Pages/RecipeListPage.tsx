import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api, FilterParams } from '../api';
import { Recipe } from '../types/recipe';

const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    try {
      const filter: FilterParams = {
        ingredient: searchParams.get('ingredient') || undefined,
        country: searchParams.get('country') || undefined,
        category: searchParams.get('category') || undefined,
      };
      const data = await api.getRecipes(filter);
      setRecipes(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes.');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const title = () => {
    const ingredient = searchParams.get('ingredient');
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    return ingredient
      ? `Recipes with ${ingredient}`
      : country
        ? `${country} Recipes`
        : category
          ? `${category} Recipes`
          : 'All Recipes';
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0',  height:'100%' }}>
      <h1>{title()}</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li
              key={recipe.idMeal}
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
            >
              {recipe.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeListPage;