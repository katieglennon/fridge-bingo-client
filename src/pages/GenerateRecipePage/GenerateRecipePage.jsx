import { getInventoryList } from "../../utils/apiUtils";
import "./GenerateRecipePage.scss";
import { useEffect, useState } from "react";
import { sendRecipeRequest } from "../../utils/apiUtils";
import loadingSpinner from "../../assets/icons/loading.gif";
import { useNavigate } from "react-router-dom";

export default function GenerateRecipePage() {
  const [inventoryStock, setInventoryStock] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mealType, setMealType] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

    setLoading(true);

    const ingredients = selectedIngredients.map(
      (item) => `${item.name.toLowerCase()} ${item.quantity} ${item.unit}`
    );

    const recipeRequestData = {
      ingredients,
      mealType,
      preparationTime,
    };
    console.log(recipeRequestData);

    try {
      const responseData = await sendRecipeRequest(recipeRequestData);
      console.log(responseData);
      navigate(`/recipes/${responseData.id}`);
    } catch (error) {
      console.error("An error occurred while generating the recipe:", error);
    } finally {
      setLoading(false);
    }

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
          <option>dessert</option>
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
      <button type="submit" disabled={loading}>
        {loading ? "Generating recipe..." : "Let's cook!"}
      </button>
      {loading && <img className="gif" src={loadingSpinner} />}
    </form>
  );
}
