import "./InventoryPage.scss";
import { getInventoryList } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard";
import AddIngredientForm from "../../components/AddIngredientForm/AddIngredientForm";
import Modal from "../../components/Modal/Modal";

export default function InventoryPage() {
  const [inventoryStock, setInventoryStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const addNewItemToInventory = (newItem) => {
    setInventoryStock((prevInventory) => [...prevInventory, newItem]);
  };

  if (!inventoryStock) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>This is the inventory page</h1>
      <button onClick={() => setIsModalOpen(true)} className="inventory__add">
        Add
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddIngredientForm
          setIsModalOpen={setIsModalOpen}
          addNewItemToInventory={addNewItemToInventory}
        />
      </Modal>
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
