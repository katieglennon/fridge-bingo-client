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
  const [isError, setIsError] = useState({
    ingredientError: false,
    mealTypeError: false,
    prepTimeError: false,
  });
  const [formValidation, setFormValidation] = useState("");

  const navigate = useNavigate();

  const fetchInventoryData = async () => {
    try {
      const inventoryStock = await getInventoryList();
      setInventoryStock(
        inventoryStock.sort((a, b) => a.name.localeCompare(b.name))
      );
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

    if (selectedIngredients.length >= 1) {
      setIsError({ ...isError, ingredientError: false });
      setFormValidation("");
    }
  };

  const handleMealTypeChange = (event) => {
    if (mealType !== "Select") {
      setMealType(event.target.value);
      setIsError({ ...isError, mealTypeError: false });
      setFormValidation("");
    }
  };

  const handlePreparationTimeChange = (event) => {
    const timeInMinutes = event.target.value;

    setPreparationTime(timeInMinutes);

    if (timeInMinutes) {
      setIsError({ ...isError, prepTimeError: false });
      setFormValidation("");
    } else {
      setIsError({ ...isError, prepTimeError: true });
      setFormValidation("Preparation time is required.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setFormValidation("");

    const ingredients = selectedIngredients.map(
      (item) => `${item.name.toLowerCase()} ${item.quantity} ${item.unit}`
    );

    if (selectedIngredients.length < 2) {
      setFormValidation("You must pick at least 2 ingredients");
      setIsError({ ...isError, ingredientError: true });
      setLoading(false);
      return;
    }

    if (!mealType || mealType === "Select") {
      setFormValidation("Please enter a meal type");
      setIsError({ ...isError, mealTypeError: true });
      setLoading(false);
      return;
    }

    if (
      preparationTime === "" ||
      isNaN(preparationTime) ||
      Number(preparationTime) <= 0
    ) {
      console.log("must be a number");
      setFormValidation("Please enter the time you have available in minutes");
      setIsError({
        ...isError,
        prepTimeError: true,
      });
      setLoading(false);
      return;
    }

    setIsError({
      ingredientError: false,
      mealTypeError: false,
      prepTimeError: false,
    });

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
  };

  return (
    <form className="generator" onSubmit={handleSubmit}>
      <fieldset
        className={`generator__fieldset ${
          isError.ingredientError ? "generator__fieldset--error" : ""
        }`}
      >
        <legend
          className={`generator__legend ${
            isError.ingredientError ? "generator__legend--error" : ""
          }`}
        >
          Choose ingredients
        </legend>
        <div className="generator__list">
          {inventoryStock
            .filter((inventoryStockItem) => inventoryStockItem.quantity > 0)
            .map((item) => (
              <label className="generator__ingredient" key={item.id}>
                <input
                  name="checkedIngredient"
                  className="generator__checkbox"
                  type="checkbox"
                  value={item.id}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item.name} - {item.quantity} {item.unit}
              </label>
            ))}
        </div>
      </fieldset>
      <fieldset
        className={`generator__fieldset ${
          isError.mealTypeError ? "generator__fieldset--error" : ""
        }`}
      >
        <legend
          className={`generator__legend ${
            isError.mealTypeError ? "generator__legend--error" : ""
          }`}
        >
          What meal do you want to cook?
        </legend>
        <select
          name="mealType"
          className="generator__meal"
          value={mealType}
          onChange={handleMealTypeChange}
        >
          <option>Select</option>
          <option>snack</option>
          <option>breakfast</option>
          <option>lunch</option>
          <option>dinner</option>
          <option>dessert</option>
        </select>
      </fieldset>
      <fieldset
        className={`generator__fieldset ${
          isError.prepTimeError ? "generator__fieldset--error" : ""
        }`}
      >
        <legend
          className={`generator__legend ${
            isError.prepTimeError ? "generator__legend--error" : ""
          }`}
        >
          How much time do you have?
        </legend>
        <input
          name="prepTime"
          className="generator__time"
          type="text"
          value={preparationTime}
          onChange={handlePreparationTimeChange}
        />
      </fieldset>

      <p
        className={`generator__validation ${
          Object.values(isError).some((error) => error)
            ? "generator__validation--error"
            : ""
        }`}
      >
        {formValidation}
      </p>

      <button className="generator__submit" type="submit" disabled={loading}>
        {loading ? "Generating recipe..." : "Let's cook!"}
      </button>
      {loading && <img className="generator__loading" src={loadingSpinner} />}
    </form>
  );
}
