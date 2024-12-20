import { useParams } from "react-router-dom";
import "./SingleRecipePage.scss";
import { useEffect, useState } from "react";
import {
  getRecipeDetails,
  rateRecipeRequest,
  saveRecipeRequest,
} from "../../utils/apiUtils";
import RecipeInstructions from "../../components/RecipeInstructions/RecipeInstructions";
import likeIcon from "../../assets/icons/likes.svg";
import LetterHover from "../../components/LetterHover/LetterHover";
import UploadRecipeImage from "../../components/UploadRecipeImage/UploadRecipeImage";
import { Rating } from "react-simple-star-rating";
import GenerateRecipeImage from "../../components/GenerateRecipeImage/GenerateRecipeImage";
import ExpandableContent from "../../components/ExpandableContent/ExpandableContent";

export default function SingleRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isSaved, setIsSaved] = useState(null);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [thanks, setThanks] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3030`;

  const fetchRecipeData = async () => {
    try {
      const recipeData = await getRecipeDetails(id);
      setRecipe(recipeData.recipe);
      setRecipeIngredients(recipeData.ingredients);
      setRating(recipeData.recipe.rating);
      setIsSaved(recipeData.recipe.is_saved);
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
      let newSavedStatus = !isSaved;
      await saveRecipeRequest(id, newSavedStatus);
      setIsSaved(newSavedStatus);
      fetchRecipeData();
    } catch (error) {
      console.error("Error updating saved status");
    }
  };

  const handleRating = async (rate) => {
    setRating(rate);
    setThanks("");
    try {
      await rateRecipeRequest(id, rate);
      setThanks("Thanks for your rating!");
      fetchRecipeData();
    } catch (error) {
      console.error("Error updating recipe rating", error);
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const ingredientsContent = (
    <div className="single-recipe__ingredients">
      {recipeIngredients.map((ingredient) => (
        <span className="single-recipe__ingredient-item" key={ingredient.id}>
          {ingredient.name}
          <span className="single-recipe__ingredient-amount">
            ({ingredient.quantity} {ingredient.unit})
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <main className="single-recipe">
      <div className="single-recipe__heading">
        <h1 className="single-recipe__name">
          <LetterHover text={recipe.name} />
        </h1>
        <img
          src={likeIcon}
          alt=""
          onClick={toggleSaveStatus}
          className={
            isSaved
              ? "single-recipe__save-indicator single-recipe__save-indicator--true"
              : "single-recipe__save-indicator"
          }
        />
      </div>

      <div className="single-recipe__content">
        <div className="single-recipe__hero">
          {recipe.image && (
            <img
              className="single-recipe__image"
              key={recipe.image}
              src={`${apiUrl}/${recipe.image}`}
              alt={`${recipe.name} dish`}
            />
          )}

          <div className="single-recipe__actions">
            <GenerateRecipeImage
              recipe={recipe}
              recipeIngredients={recipeIngredients}
              fetchRecipeData={fetchRecipeData}
              id={id}
            />

            <UploadRecipeImage id={id} fetchRecipeData={fetchRecipeData} />

            <p className="single-recipe__rating-status">
              {thanks || "Rate this Plate"}
            </p>
            <Rating
              onClick={handleRating}
              fillColor="#f1db4b"
              initialValue={rating}
            />
          </div>
        </div>

        <div className="single-recipe__method">
          <div className="single-recipe__details">
            <ExpandableContent
              entity={"ingredients"}
              content={ingredientsContent}
            />
            <p className="single-recipe__time">{recipe.prep_time} minutes</p>
          </div>

          <RecipeInstructions instructions={recipe.instructions} />
        </div>
      </div>
    </main>
  );
}
