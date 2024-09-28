import "./RecipeInstructions.scss";
import { useState } from "react";

export default function RecipeInstructions({ instructions }) {
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleStepClick = (index) => {
    setCompletedSteps((prev) => {
      if (prev.includes(index)) {
        return prev.filter((stepIndex) => stepIndex !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <ol className="instructions">
      {JSON.parse(instructions).map((step, index) => (
        <li
          onClick={() => handleStepClick(index)}
          className={`instructions__step ${
            completedSteps.includes(index) ? "instructions__step--complete" : ""
          }`}
          key={index}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}
