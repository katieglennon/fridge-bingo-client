import { useParams } from "react-router-dom";
import "./SingleRecipePage.scss";
import { useEffect, useState } from "react";
import { getRecipeDetails, saveRecipeRequest } from "../../utils/apiUtils";
import RecipeInstructions from "../../components/RecipeInstructions/RecipeInstructions";
import likeIcon from "../../assets/icons/likes.svg";

export default function SingleRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const { id } = useParams();

  const fetchRecipeData = async () => {
    try {
      const recipeData = await getRecipeDetails(id);
      setRecipe(recipeData);
      setIsSaved(recipeData.is_saved);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  const toggleSaveStatus = async () => {
    try {
      let newSavedStatus = "";
      if (isSaved) {
        newSavedStatus = false;
      } else {
        newSavedStatus = true;
      }
      await saveRecipeRequest(id, newSavedStatus);
      setIsSaved(newSavedStatus);
      fetchRecipeData();
    } catch (error) {
      console.error("Error updating saved status");
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <main className="single-recipe">
      <h1 className="single-recipe__name">{recipe.name}</h1>
      <img
        src={likeIcon}
        alt=""
        className={
          isSaved
            ? "single-recipe__save-indicator single-recipe__save-indicator--true"
            : "single-recipe__save-indicator"
        }
      />
      <button onClick={toggleSaveStatus} className="single-recipe__save">
        {isSaved ? "Unsave Recipe" : "Save Recipe"}
      </button>
      <img src="https://placehold.co/400" alt="" />

      <p className="single-recipe__time">{recipe.prep_time} minutes</p>

      <RecipeInstructions instructions={recipe.instructions} />
    </main>
  );
}
