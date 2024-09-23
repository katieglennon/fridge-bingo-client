import "./InventoryItemCard.scss";

export default function InventoryItemCard({ inventoryStockItem }) {
  const expiryDate = new Date(inventoryStockItem.expiration_date);
  const formattedExpiryDate = expiryDate.toLocaleDateString("en-GB");

  return (
    <article className="inventory-item-card">
      <h1 className="inventory-item-card__name">{inventoryStockItem.name}</h1>
      <span className="inventory-item-card__quantity">
        {inventoryStockItem.quantity}
      </span>
      <span className="inventory-item-card__unit">
        {inventoryStockItem.unit}
      </span>
      <span className="inventory-item-card__expiry">{formattedExpiryDate}</span>
    </article>
  );
}
