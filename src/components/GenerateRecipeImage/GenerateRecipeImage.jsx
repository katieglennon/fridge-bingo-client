import { useState } from "react";
import loadingSpinner from "../../assets/icons/loading.gif";
import { generateRecipeImageRequest } from "../../utils/apiUtils";

export default function GenerateRecipeImage({
  recipeIngredients,
  recipe,
  fetchRecipeData,
  id,
}) {
  const [loading, setLoading] = useState(false);

  const ingredientsForPrompt = recipeIngredients.map(
    (ingredient) => `${ingredient.name}`
  );

  const handleImageGeneration = async (recipe) => {
    setLoading(true);
    const prompt = `Generate an image of a dish titled ${recipe.name} containting these ingredients ${ingredientsForPrompt}`;

    try {
      if (prompt) {
        await generateRecipeImageRequest(id, prompt);
        fetchRecipeData();
      }
    } catch (error) {
      console.error("Error generating recipe image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleImageGeneration}>Generate image</button>
      {loading && (
        <img className="single-recipe__loading" src={loadingSpinner} />
      )}
    </div>
  );
}
