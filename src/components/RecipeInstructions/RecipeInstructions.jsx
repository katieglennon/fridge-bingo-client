import "./RecipeInstructions.scss";

export default function RecipeInstructions({ instructions }) {
  const steps = instructions
    .split(".")
    .map((step) => step.trim().replace(/^,/, "").trim())
    .filter((step) => step !== "");

  return (
    <ol className="instructions">
      {steps.map((step, index) => (
        <li className="instructions__step" key={index}>
          {step}
        </li>
      ))}
    </ol>
  );
}
