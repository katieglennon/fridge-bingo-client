import { getInventoryList } from "../../utils/apiUtils";
import "./GenerateRecipeForm.scss";
import { useEffect, useState } from "react";

export default function GenerateRecipeForm() {
  const [inventoryStock, setInventoryStock] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mealType, setMealType] = useState("");
  const [preparationTime, setPreparationTime] = useState("");

  const fetchInventoryData = async () => {
    try {
      const inventoryStock = await getInventoryList();
      setInventoryStock(inventoryStock);
      //   console.log(inventoryStock);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  if (!inventoryStock) {
    return <p>Loading...</p>;
  }

  const handleCheckboxChange = (item) => {
    const isSelected = selectedIngredients.find((i) => i.id === item.id);

    if (isSelected) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i.id !== item.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, item]);
    }
  };

  const handleMealTypeChange = (event) => {
    setMealType(event.target.value);
  };

  const handlePreparationTimeChange = (event) => {
    setPreparationTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const ingredients = selectedIngredients.map(
      (item) => `${item.name.toLowerCase()} ${item.quantity} ${item.unit}`
    );

    const recipeRequestData = {
      ingredients,
      mealType,
      preparationTime,
    };
    console.log(recipeRequestData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <legend>Choose ingredients</legend>
        {inventoryStock.map((item) => (
          <label key={item.id}>
            {item.name} - {item.category} ({item.quantity} {item.unit})
            <input
              type="checkbox"
              value={item.id}
              onChange={() => handleCheckboxChange(item)}
            />
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>What meal do you want to cook?</legend>
        <select value={mealType} onChange={handleMealTypeChange}>
          <option>Select</option>
          <option>Snack</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>How much time do you have?</legend>
        <input
          type="text"
          value={preparationTime}
          onChange={handlePreparationTimeChange}
        />
      </fieldset>
      <button type="submit">Generate recipe</button>
    </form>
  );
}
