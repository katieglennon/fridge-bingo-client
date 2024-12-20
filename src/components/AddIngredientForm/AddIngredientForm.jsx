import "./AddIngredientForm.scss";
import UnitForm from "../UnitForm/UnitForm";
import { useState } from "react";
import { addStockItem } from "../../utils/apiUtils";

export default function AddIngredient({
  setIsModalOpen,
  addNewItemToInventory,
}) {
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [unit, setUnit] = useState("");
  const [unitError, setUnitError] = useState("");
  const [isError, setIsError] = useState({
    itemNameError: false,
    categoryError: false,
    expirationDateError: false,
    quantityError: false,
    unitError: false,
  });
  const [formValidation, setFormValidation] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "itemName") {
      if (!inputValue) {
        setIsError({ ...isError, itemNameError: true });
      } else {
        setIsError({ ...isError, itemNameError: false });
        setFormValidation("");
      }
    } else if (inputName === "category") {
      if (inputValue === "Select") {
        setIsError({ ...isError, categoryError: true });
      } else {
        setIsError({ ...isError, categoryError: false });
        setFormValidation("");
      }
    } else if (inputName === "quantity") {
      setQuantity(inputValue);
      if (!inputValue) {
        setIsError({ ...isError, quantityError: true });
      } else {
        setIsError({ ...isError, quantityError: false });
        setFormValidation("");
      }
    } else if (inputName === "unit") {
      setUnit(inputValue);
      if (inputValue === "Select") {
        setIsError({ ...isError, unitError: true });
      } else {
        setIsError({ ...isError, unitError: false });
        setFormValidation("");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const itemName = event.target.itemName.value;
    const category = event.target.category.value.replace(
      /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}]/gu,
      ""
    );
    const expirationDate = event.target.expirationDate.value;

    if (!itemName) {
      setFormValidation("Please enter a name for the item");
      setIsError({ ...isError, itemNameError: true });
      return;
    }

    if (category === "Select") {
      setFormValidation("Please enter a category type");
      setIsError({ ...isError, categoryError: true });
      return;
    }

    if (quantity === "" || isNaN(quantity) || Number(quantity) <= 0) {
      setFormValidation("Please enter a valid quantity. This must be a number");
      setIsError({
        ...isError,
        quantityError: true,
      });
      return;
    }

    if (!unit || unit === "Select") {
      setFormValidation("Please select the unit");
      setIsError({
        ...isError,
        unitError: true,
      });
      return;
    }

    setIsError({
      itemNameError: false,
      categoryError: false,
      quantityError: false,
      unitError: false,
    });

    const stockItemData = {
      name: itemName.toLowerCase().trim(),
      category: category.toLowerCase().trim(),
      unit: unit.toLowerCase(),
      quantity: quantity,
      expiration_date: expirationDate === "" ? null : expirationDate,
      inventory_id: 1,
    };

    try {
      const responseData = await addStockItem(stockItemData);
      setFormValidation("Item added!");
      addNewItemToInventory(stockItemData);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error(
        "An error occurred while adding the item to your inventory:",
        error
      );
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient">
        <label className="add-ingredient__form-label">
          Item Name
          <input
            name="itemName"
            type="text"
            className={`add-ingredient__form-input ${
              isError.itemNameError ? "add-ingredient__form-input--error" : ""
            }`}
            onChange={handleInputChange}
          />
        </label>
        <label className="add-ingredient__form-label">
          Category
          <select
            name="category"
            className={`add-ingredient__form-input ${
              isError.categoryError ? "add-ingredient__form-input--error" : ""
            }`}
            onChange={handleInputChange}
          >
            <option>Select</option>
            <option>🍎 Fruits</option>
            <option>🥦 Vegetables</option>
            <option>🌾 Grains</option>
            <option>🌿 Herbs</option>
            <option>🍗 Proteins</option>
            <option>🧀 Dairy</option>
            <option>🌶️ Spices</option>
            <option>🥫 Other</option>
          </select>
        </label>
        <UnitForm
          setQuantity={setQuantity}
          setUnit={setUnit}
          quantityError={quantityError}
          setQuantityError={setQuantityError}
          unitError={unitError}
          setUnitError={setUnitError}
          isError={isError}
          handleInputChange={handleInputChange}
        />
        <label className="add-ingredient__form-label">
          Expiration date
          <input
            type="date"
            name="expirationDate"
            className="add-ingredient__form-input"
          />
        </label>

        <p
          className={`add-ingredient__validation ${
            Object.values(isError).some((error) => error)
              ? "add-ingredient__validation--error"
              : formValidation === "Item added!"
              ? "add-ingredient__validation"
              : ""
          }`}
        >
          {formValidation}
        </p>
        <div className="add-ingredient__cta">
          <button
            onClick={closeModal}
            type="button"
            className="add-ingredient__button add-ingredient__button--cancel"
          >
            <p className="add-ingredient__form-label">Cancel</p>
          </button>
          <button type="submit" className="add-ingredient__button">
            <p className="add-ingredient__form-label">Add ingredient</p>
          </button>
        </div>
      </form>
    </main>
  );
}
