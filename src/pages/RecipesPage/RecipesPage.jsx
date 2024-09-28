import "./RecipesPage.scss";
import LetterHover from "../../components/LetterHover/LetterHover";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function RecipesPage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");

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

  const emojiMapping = Object.fromEntries(
    types.map(({ name, emoji }) => [name, emoji])
  );

  const filteredRecipes = allRecipes.filter((recipe) => {
    const matchesSearchTerm = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTypeFilter =
      typeFilter === "all" || recipe.meal_type === typeFilter;

    return matchesSearchTerm && matchesTypeFilter;
  });

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

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
      <Link className="recipes__saved" to="/recipes/saved">
        View saved
      </Link>

      <Link className="recipes__new" to="/recipes/new">
        Create new Recipe
      </Link>

      <SearchBar handleSearchInput={handleSearchInput} />

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
      </div>

      <button onClick={toggleSortOrder} className="recipes__sort-button">
        Sort by:{" "}
        {sortOrder === "newest" ? "Oldest to Newest" : "Newest to Oldest"}
      </button>

      {sortedFilteredRecipes.map((recipe) => {
        const recipeEmoji = emojiMapping[recipe.meal_type] || "";
        return (
          <Link
            className="recipes__link"
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
          >
            <li className="recipes__list-item">
              {recipeEmoji} {recipe.name} <span>{recipe.meal_type}</span>
              <span className="recipes__time"> ⏲️ {recipe.prep_time} mins</span>
            </li>
          </Link>
        );
      })}
    </main>
  );
}
