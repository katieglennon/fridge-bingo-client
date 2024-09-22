import { useParams } from "react-router-dom";
import "./SingleRecipePage.scss";
import { useEffect, useState } from "react";
import { getRecipeDetails } from "../../utils/apiUtils";
import RecipeInstructions from "../../components/RecipeInstructions/RecipeInstructions";

export default function SingleRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  const fetchRecipeData = async () => {
    try {
      const recipeData = await getRecipeDetails(id);
      setRecipe(recipeData);
      console.log(recipeData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <main className="single-recipe">
      <h1 className="single-recipe__name">{recipe.name}</h1>
      <img src="https://placehold.co/400" alt="" />

      <p className="single-recipe__time">{recipe.prep_time} minutes</p>

      <RecipeInstructions instructions={recipe.instructions} />
      {/* <p className="single-recipe__instructions">{recipe.instructions}</p> */}
    </main>
  );
}
