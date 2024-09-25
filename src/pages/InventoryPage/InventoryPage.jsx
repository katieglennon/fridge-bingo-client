import "./InventoryPage.scss";
import { getInventoryList } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard";
import AddIngredientForm from "../../components/AddIngredientForm/AddIngredientForm";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function InventoryPage() {
  const [inventoryStock, setInventoryStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  const categories = [
    { name: "all", emoji: "🍽️" },
    { name: "fruits", emoji: "🍎" },
    { name: "vegetables", emoji: "🥦" },
    { name: "grains", emoji: "🌾" },
    { name: "herbs", emoji: "🌿" },
    { name: "proteins", emoji: "🍗" },
    { name: "dairy", emoji: "🧀" },
    { name: "spices", emoji: "🌶️" },
    { name: "other", emoji: "🥫" },
  ];

  const filteredStock = inventoryStock.filter((item) => {
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategoryFilter =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearchTerm && matchesCategoryFilter;
  });

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelection = (category) => {
    setCategoryFilter(category);
  };

  return (
    <main>
      <h1>Explore your inventory</h1>
      <SearchBar handleSearchInput={handleSearchInput} />

      <div className="category-filter">
        {categories.map(({ name, emoji }) => (
          <button
            key={name}
            onClick={() => handleCategorySelection(name)}
            className={`category-filter__button ${
              categoryFilter === name ? "active" : ""
            }`}
          >
            {name} {emoji}
          </button>
        ))}
      </div>

      <button onClick={() => setIsModalOpen(true)} className="inventory__add">
        Add
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddIngredientForm
          setIsModalOpen={setIsModalOpen}
          addNewItemToInventory={addNewItemToInventory}
        />
      </Modal>
      {filteredStock
        .filter((inventoryStockItem) => inventoryStockItem.quantity > 0)
        .map((inventoryStockItem) => {
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
