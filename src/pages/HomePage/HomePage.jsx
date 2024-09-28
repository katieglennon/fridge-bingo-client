import { Link } from "react-router-dom";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <main className="home">
      <Link className="home__link home__link--inventory" to="/inventory">
        Check out Inventory
      </Link>
      <Link className="home__link home__link--new-recipe" to="/recipes/new">
        Build a New Recipe
      </Link>
      <Link
        className="home__link home__link--saved-recipes"
        to="/recipes/saved"
      >
        Saved Recipes
      </Link>
      <Link className="home__link home__link--all-recipes" to="/recipes">
        All Recipes
      </Link>
    </main>
  );
}
