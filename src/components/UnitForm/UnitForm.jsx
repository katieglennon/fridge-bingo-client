import { useState } from "react";
import "./UnitForm.scss";

export default function UnitForm({ setQuantity, setUnit }) {
  const [unitSystem, setUnitSystem] = useState("");

  const imperial = [
    "Select",
    "Teaspoon",
    "Tablespoon",
    "Pound",
    "Ounce",
    "Fluid Ounce",
    "Cup",
    "Pint",
  ];
  const metric = [
    "Select",
    "Millilitre",
    "Litre",
    "Milligram",
    "Gram",
    "Kilogram",
  ];

  const handleUnitChange = (event) => {
    setUnitSystem(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSelectedUnitChange = (event) => {
    setUnit(event.target.value);
  };
  return (
    <form className="unit-form">
      {/* must be a number */}
      <label className="unit-form__label">
        Quantity
        <input
          type="text"
          onChange={handleQuantityChange}
          className="unit-form__input"
        />
      </label>
      <div className="unit-form__radio">
        <p className="unit-form__label">Select Unit System:</p>
        <label className="unit-form__label">
          <input
            type="radio"
            value="imperial"
            checked={unitSystem === "imperial"}
            onChange={handleUnitChange}
            className="unit-form__radio-option"
          />
          Imperial
        </label>
        <label className="unit-form__label">
          <input
            type="radio"
            value="metric"
            checked={unitSystem === "metric"}
            onChange={handleUnitChange}
            className="unit-form__radio-option"
          />
          Metric
        </label>
      </div>

      {unitSystem && (
        <div>
          <p className="unit-form__label">Select Unit of Measurement:</p>
          <select
            onChange={handleSelectedUnitChange}
            className="unit-form__input"
          >
            {(unitSystem === "imperial" ? imperial : metric).map(
              (option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              )
            )}
          </select>
        </div>
      )}
    </form>
  );
}
