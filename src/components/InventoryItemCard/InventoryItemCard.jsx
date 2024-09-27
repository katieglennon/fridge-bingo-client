import { editStockItem } from "../../utils/apiUtils";
import "./InventoryItemCard.scss";
import { useState, useEffect } from "react";

export default function InventoryItemCard({
  inventoryStockItem,
  fetchInventoryData,
}) {
  const expiryDate = inventoryStockItem.expiration_date
    ? new Date(inventoryStockItem.expiration_date)
    : null;
  const formattedExpiryDate = expiryDate
    ? expiryDate.toLocaleDateString("en-GB")
    : null;
  const [isExpired, setIsExpired] = useState(false);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(inventoryStockItem.name);
  const [quantity, setQuantity] = useState(inventoryStockItem.quantity);
  const [unit, setUnit] = useState(inventoryStockItem.unit);
  const [category, setCategory] = useState(inventoryStockItem.category);
  const [expirationDate, setExpirationDate] = useState(
    inventoryStockItem.expiration_date
  );

  const categoryEmojis = {
    fruits: "🍎",
    vegetables: "🥦",
    grains: "🌾",
    herbs: "🌿",
    proteins: "🍗",
    dairy: "🧀",
    spices: "🌶️",
    other: "🥫",
  };

  const emoji = categoryEmojis[inventoryStockItem.category];

  useEffect(() => {
    if (expiryDate) {
      const today = new Date();
      const daysTilExpiry = (expiryDate - today) / (1000 * 60 * 60 * 24);
      setIsExpired(expiryDate < today);
      setIsExpiringSoon(daysTilExpiry > 0 && daysTilExpiry <= 3);
    } else {
      setIsExpired(false);
      setIsExpiringSoon(false);
    }
  }, [expiryDate]);

  const handleSave = async () => {
    const updatedItem = {
      ...inventoryStockItem,
      name,
      quantity,
      unit,
      category,
      expiration_date: expirationDate,
    };
    console.log(updatedItem);

    try {
      await editStockItem(inventoryStockItem.id, updatedItem);

      if (fetchInventoryData) {
        await fetchInventoryData();
      }
      setIsEditing(false);
    } catch (error) {
      console.error(
        "An error occurred while updapting the inventory item:",
        error
      );
    }
  };

  return (
    <article
      className={`inventory-item-card 
      ${
        isExpired
          ? "inventory-item-card--expired"
          : isExpiringSoon
          ? "inventory-item-card--expiring-soon"
          : ""
      }`}
    >
      <div className="inventory-item-card__header">
        {isEditing ? (
          <>
            <input
              className="inventory-item-card__input-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <select
              className="inventory-item-card__input-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {Object.keys(categoryEmojis).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <h1
            className="inventory-item-card__name"
            onClick={() => setIsEditing(true)}
          >
            {name} {emoji}
          </h1>
        )}

        {isExpired && (
          <span className="inventory-item-card__expired">expired</span>
        )}
        {isExpiringSoon && (
          <span className="inventory-item-card__expiring-soon-message">
            expiring soon!
          </span>
        )}
      </div>

      <div className="inventory-item-card__info">
        <div className="inventory-item-card__amount">
          {isEditing ? (
            <>
              <input
                className="inventory-item-card__input-quantity"
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
              <input
                className="inventory-item-card__input-unit"
                type="text"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
              />
            </>
          ) : (
            <>
              <span className="inventory-item-card__quantity">
                {`${quantity} `}
              </span>
              <span className="inventory-item-card__unit">{unit}</span>
            </>
          )}
        </div>

        {isEditing ? (
          <div className="inventory-item-card__expiry-edit">
            <label>Expires:</label>
            <input
              type="date"
              value={expirationDate ? expirationDate.substring(0, 10) : ""}
              onChange={(event) => {
                const newExpiryDate = event.target.value;
                setExpirationDate(newExpiryDate ? newExpiryDate : null);
              }}
            />
          </div>
        ) : (
          formattedExpiryDate && (
            <span className="inventory-item-card__expiry">
              Expires: {formattedExpiryDate}
            </span>
          )
        )}
      </div>
      {isEditing && (
        <div className="inventory-item-card__edit-buttons">
          <button
            className="inventory-item-card__save-button"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="inventory-item-card__cancel-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </article>
  );
}
