import "./AddIngredientForm.scss";
import UnitForm from "../UnitForm/UnitForm";
import { useState } from "react";

export default function AddIngredient() {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [isError, setIsError] = useState({
    itemNameError: false,
    categoryError: false,
    expirationDateError: false,
    quantityError: false,
    unitError: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const itemName = event.target.itemName.value;
    const category = event.target.category.value;
    const expirationDate = event.target.expirationDate.value;
    const quantity = event.target.quantity.value;
    const unit = event.target.unit.value;

    if (!itemName) {
      console.log("Please enter a name for the item");
      setIsError({ ...isError, itemNameError: true });
      return;
    }

    if (!category) {
      console.log("Please enter a category type");
      setIsError({ itemNameError: false, categoryError: true });
      return;
    }

    console.log("Item Name:", itemName);
    console.log("Category:", category);
    console.log("Expiration Date:", expirationDate);
    console.log("Quantity:", quantity);
    console.log("Unit of Measurement:", unit);
  };
  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient">
        <label className="add-ingredient__form-label">
          Item Name
          <input
            name="itemName"
            type="text"
            className="add-ingredient__form-input"
          />
        </label>
        <label className="add-ingredient__form-label">
          Category
          <select name="category" className="add-ingredient__form-input">
            <option>Select</option>
            <option>🍎 Fruits</option>
            <option>🥦 Vegetables</option>
            <option>🌾 Grains</option>
            <option>🥩 Proteins</option>
            <option>🧀 Dairy</option>
            <option>🌶️ Spices</option>
            <option>🥫 Other</option>
          </select>
        </label>
        <UnitForm setQuantity={setQuantity} setUnit={setUnit} />
        <label className="add-ingredient__form-label">
          Expiration date
          <input
            type="date"
            name="expirationDate"
            className="add-ingredient__form-input"
          />
        </label>
        <div className="add-ingredient__cta">
          <button className="add-ingredient__button add-ingredient__button--cancel">
            <p className="add-ingredient__form-label">Cancel</p>
          </button>
          <button className="add-ingredient__button">
            <p className="add-ingredient__form-label">Add ingredient</p>
          </button>
        </div>
      </form>
    </main>
  );
}
