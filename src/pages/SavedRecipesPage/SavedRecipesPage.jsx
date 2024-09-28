import "./SavedRecipesPage.scss";
import Note from "../../components/Note/Note";
import { getSavedRecipes } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import LetterHover from "../../components/LetterHover/LetterHover";
import { Link } from "react-router-dom";

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState("highest");

  const noteColors = [
    "#ff3cc7",
    "#6b7fd7",
    "#f1db4b",
    "#09bc8a",
    "#f81212",
    "#ed7d3a",
  ];

  const fetchSavedRecipes = async () => {
    try {
      const savedRecipesList = await getSavedRecipes();

      const recipeCardStyles = savedRecipesList.map((recipe) => ({
        ...recipe,
        skewX: Math.random() * 2 - 1,
        skewY: Math.random() * 2 - 1,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
      }));

      setSavedRecipes(recipeCardStyles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "highest" ? "lowest" : "highest"
    );
  };

  const sortedSavedRecipes = savedRecipes.sort((a, b) => {
    return sortOrder === "highest"
      ? new Date(b.rating) - new Date(a.rating)
      : new Date(a.rating) - new Date(b.rating);
  });

  return (
    <main className="saved-recipes">
      <h1 className="saved-recipes__heading">
        <LetterHover text="Favourite Dishes" />
      </h1>
      <Link className="saved-recipes__link" to="/recipes">
        View history
      </Link>
      <button onClick={toggleSortOrder} className="saved-recipes__sort-button">
        Sort by Rating: {sortOrder === "highest" ? "Ascending" : "Descending"}
      </button>

      {sortedSavedRecipes.map((recipe) => {
        return (
          <Note
            key={recipe.id}
            recipe={recipe}
            skewX={recipe.skewX}
            skewY={recipe.skewY}
            color={recipe.color}
          />
        );
      })}
    </main>
  );
}
