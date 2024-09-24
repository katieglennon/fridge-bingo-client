import { Link } from "react-router-dom";
import "./Note.scss";

export default function Note({ recipe, skewX, skewY, color }) {
  const noteStyle = {
    transform: `skew(${skewX}deg, ${skewY}deg)`,
    backgroundColor: color,
  };
  return (
    <>
      <Link className="note__link" to={`/recipes/${recipe.id}`}>
        <article className="note" style={noteStyle}>
          <h1 className="note__heading">{recipe.name}</h1>
          <div className="note__subheading">
            <p className="note__type">{recipe.meal_type}</p>
            <p className="note__time">{recipe.prep_time} minutes</p>
          </div>
          <img className="note__image" src="https://placehold.co/100" alt="" />
          <p>⭐⭐⭐</p>
        </article>
      </Link>
    </>
  );
}
