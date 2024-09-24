import "./SavedRecipesPage.scss";
import Note from "../../components/Note/Note";
import { getSavedRecipes } from "../../utils/apiUtils";
import { useState, useEffect } from "react";

export default function SavedRecipesPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);

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

  return (
    <main className="saved-recipes">
      <h1>This is the saved recipes page</h1>
      {savedRecipes.map((recipe) => {
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
