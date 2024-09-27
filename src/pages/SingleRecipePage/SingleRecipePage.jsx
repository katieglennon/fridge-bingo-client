import { useParams, useLocation } from "react-router-dom";
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
import { Link } from "react-router-dom";
import UploadRecipeImage from "../../components/UploadRecipeImage/UploadRecipeImage";
import { Rating } from "react-simple-star-rating";

export default function SingleRecipePage() {
  const location = useLocation();
  const { ingredients } = location.state || {};

  const [recipe, setRecipe] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [thanks, setThanks] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3030`;

  console.log("Ingredients passed:", ingredients);

  const fetchRecipeData = async () => {
    try {
      const recipeData = await getRecipeDetails(id);
      setRecipe(recipeData);
      setRating(recipeData.rating);
      setIsSaved(recipeData.is_saved);
      console.log(recipeData.rating);
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

  return (
    <main className="single-recipe">
      <Link to="/recipes">Back to all</Link>
      <div className="single-recipe__heading">
        {" "}
        <h1 className="single-recipe__name">
          <LetterHover text={recipe.name} />
          <img
            src={likeIcon}
            alt=""
            className={
              isSaved
                ? "single-recipe__save-indicator single-recipe__save-indicator--true"
                : "single-recipe__save-indicator"
            }
          />
        </h1>
      </div>
      <button onClick={toggleSaveStatus} className="single-recipe__save-button">
        {isSaved ? "Unsave Recipe" : "Save Recipe"}
      </button>
      <img
        className="single-recipe__image"
        src={`${apiUrl}/${recipe.image}`}
        alt=""
      />
      <Rating
        onClick={handleRating}
        fillColor="#f1db4b"
        initialValue={rating}
      />
      <p className="single-recipe__rating-status">
        {thanks || "Rate this Plate"}
      </p>
      <UploadRecipeImage id={id} fetchRecipeData={fetchRecipeData} />
      <p className="single-recipe__time">{recipe.prep_time} minutes</p>
      <RecipeInstructions instructions={recipe.instructions} />
    </main>
  );
}
