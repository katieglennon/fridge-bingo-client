import "./RecipesPage.scss";
import LetterHover from "../../components/LetterHover/LetterHover";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../utils/apiUtils";
import { useState, useEffect } from "react";

export default function RecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchAllRecipes = async () => {
    try {
      const allRecipesList = await getAllRecipes();
      setAllRecipes(allRecipesList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const types = [
    { name: "all", emoji: "🍽️" },
    { name: "breakfast", emoji: "🥐" },
    { name: "lunch", emoji: "🥪" },
    { name: "dinner", emoji: "🍝" },
    { name: "dessert", emoji: "🍨" },
    { name: "snack", emoji: "🍿" },
  ];

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesTypeFilter =
      typeFilter === "all" || recipe.meal_type === typeFilter;

    return matchesTypeFilter;
  });

  const handleTypeSelection = (type) => {
    setTypeFilter(type);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  const sortedFilteredRecipes = filteredRecipes.sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at);
  });

  return (
    <main className="recipes">
      <h1 className="recipes__heading">
        <LetterHover text="Recipe Collection" />
      </h1>
      <Link to="/recipes/saved">View saved</Link>
      <ul>
        <div className="recipes__filter">
          {types.map(({ name, emoji }) => (
            <button
              key={name}
              onClick={() => handleTypeSelection(name)}
              className={`recipes__filter-button ${
                typeFilter === name ? "recipes__filter-button--active" : ""
              }`}
            >
              {name} {emoji}
            </button>
          ))}
          <button onClick={toggleSortOrder} className="recipes__sort-button">
            Sort by:{" "}
            {sortOrder === "newest" ? "Oldest to Newest" : "Newest to Oldest"}
          </button>
        </div>

        {sortedFilteredRecipes.map((recipe) => {
          return (
            <Link
              className="recipes__link"
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
            >
              {" "}
              <li className="recipes__list-item">
                {recipe.name} <span>{recipe.meal_type}</span>
                <span className="recipes__time">
                  ⏲️ {recipe.prep_time} mins
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
