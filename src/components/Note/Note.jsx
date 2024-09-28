import { Link } from "react-router-dom";
import "./Note.scss";
import placeholder from "../../assets/icons/plateholder.avif";

export default function Note({ recipe, skewX, skewY, color }) {
  const noteStyle = {
    transform: `skew(${skewX}deg, ${skewY}deg)`,
    backgroundColor: color,
  };

  const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3030`;

  return (
    <>
      <Link className="note__link" to={`/recipes/${recipe.id}`}>
        <article className="note" style={noteStyle}>
          <h1 className="note__heading">{recipe.name}</h1>
          <div className="note__subheading">
            <p className="note__type">{recipe.meal_type}</p>
            <p className="note__time">{recipe.prep_time} minutes</p>
          </div>
          <div className="note__image-container">
            {recipe.image ? (
              <img
                className="note__image"
                src={`${apiUrl}/${recipe.image}`}
                alt={recipe.name}
              />
            ) : (
              <img
                src={placeholder}
                alt="placeholder"
                className="note__image"
              />
            )}
          </div>
          <p>
            {Array.from({ length: recipe.rating }, (_, index) => (
              <span key={index}>⭐</span>
            ))}
          </p>
        </article>
      </Link>
    </>
  );
}
