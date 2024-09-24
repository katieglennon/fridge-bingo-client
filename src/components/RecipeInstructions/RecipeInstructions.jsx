import "./RecipeInstructions.scss";

export default function RecipeInstructions({ instructions }) {
  return (
    <ol className="instructions">
      {JSON.parse(instructions).map((step, index) => (
        <li className="instructions__step" key={index}>
          {step}
        </li>
      ))}
    </ol>
  );
}
