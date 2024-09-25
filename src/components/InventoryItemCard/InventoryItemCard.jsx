import "./InventoryItemCard.scss";
import { useState, useEffect } from "react";

export default function InventoryItemCard({ inventoryStockItem }) {
  const expiryDate = new Date(inventoryStockItem.expiration_date);
  const formattedExpiryDate = expiryDate.toLocaleDateString("en-GB");
  const [isExpired, setIsExpired] = useState(false);
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

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
    const today = new Date();
    const daysTilExpiry = (expiryDate - today) / (1000 * 60 * 60 * 24);
    setIsExpired(expiryDate < today);
    setIsExpiringSoon(daysTilExpiry > 0 && daysTilExpiry <= 3);
  }, [expiryDate]);

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
        <h1 className="inventory-item-card__name">
          {inventoryStockItem.name} {emoji}
        </h1>
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
          <span className="inventory-item-card__quantity">
            {`${inventoryStockItem.quantity} `}
          </span>
          <span className="inventory-item-card__unit">
            {inventoryStockItem.unit}
          </span>
        </div>
        <span className="inventory-item-card__expiry">
          Expires: {formattedExpiryDate}
        </span>
      </div>
    </article>
  );
}
