import "./InventoryPage.scss";
import { getInventoryList } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard";
import AddIngredientForm from "../../components/AddIngredientForm/AddIngredientForm";

export default function InventoryPage() {
  const [inventoryStock, setInventoryStock] = useState(null);

  const fetchInventoryData = async () => {
    try {
      const inventoryStock = await getInventoryList();
      setInventoryStock(inventoryStock);
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

  return (
    <main>
      <h1>This is the inventory page</h1>
      <AddIngredientForm />
      <button className="inventory__add">Add</button>
      {inventoryStock.map((inventoryStockItem) => {
        return (
          <InventoryItemCard
            key={inventoryStockItem.id}
            inventoryStockItem={inventoryStockItem}
          />
        );
      })}
    </main>
  );
}
