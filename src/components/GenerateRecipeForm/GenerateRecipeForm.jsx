import { getInventoryList } from "../../utils/apiUtils";
import "./GenerateRecipeForm.scss";
import { useEffect, useState } from "react";
import { sendRecipeRequest } from "../../utils/apiUtils";

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

  const handleSubmit = async (event) => {
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

    const responseData = await sendRecipeRequest(recipeRequestData);

    // add loading spinner whilst recipe generating
    // disable the button to generate show a loading message

    console.log(responseData);

    // id will be in response.data.id
    //
    // useNavigate(`/recipe/${response.data.id}`)

    // REMEMBER TO CREATE ROUTE IN APP.JSX
    // that route will load your component for individual recipe page
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
          <option>snack</option>
          <option>breakfast</option>
          <option>lunch</option>
          <option>dinner</option>
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
