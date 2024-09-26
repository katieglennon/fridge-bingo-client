import "./RecipesPage.scss";
import LetterHover from "../../components/LetterHover/LetterHover";

export default function RecipesPage() {
  return (
    <main className="recipes">
      <h1 className="recipes__heading">
        <LetterHover text="Recipe Collection" />
      </h1>
    </main>
  );
}
