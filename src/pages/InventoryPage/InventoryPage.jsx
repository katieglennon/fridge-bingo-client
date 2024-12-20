import "./InventoryPage.scss";
import { getInventoryList } from "../../utils/apiUtils";
import { useState, useEffect } from "react";
import InventoryItemCard from "../../components/InventoryItemCard/InventoryItemCard";
import AddIngredientForm from "../../components/AddIngredientForm/AddIngredientForm";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/SearchBar/SearchBar";
import LetterHover from "../../components/LetterHover/LetterHover";

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

  const addNewItemToInventory = async (newItem) => {
    setInventoryStock((prevInventory) => [...prevInventory, newItem]);
    await fetchInventoryData();
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

  const sortedFilteredStock = filteredStock.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelection = (category) => {
    setCategoryFilter(category);
  };

  return (
    <main className="inventory">
      <header className="inventory__header">
        <h1 className="inventory__heading">
          {" "}
          <LetterHover text="Explore your Inventory" />
        </h1>
        <p className="inventory__text">Click an item to edit</p>
        <div className="inventory__actions">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inventory__add-button"
          >
            Add to inventory
          </button>

          <SearchBar
            className="inventory__search"
            handleSearchInput={handleSearchInput}
          />
        </div>
      </header>
      <div className="inventory__filter-container">
        <p className="inventory__text inventory__text--show-on-large">
          Click an item to edit
        </p>
        <div className="inventory__filter">
          {categories.map(({ name, emoji }) => (
            <button
              key={name}
              onClick={() => handleCategorySelection(name)}
              className={`inventory__filter-button ${
                categoryFilter === name
                  ? "inventory__filter-button--active"
                  : ""
              }`}
            >
              {name} {emoji}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddIngredientForm
          setIsModalOpen={setIsModalOpen}
          addNewItemToInventory={addNewItemToInventory}
        />
      </Modal>
      <section className="inventory__list">
        {sortedFilteredStock
          .filter((inventoryStockItem) => inventoryStockItem.quantity > 0)
          .map((inventoryStockItem, index) => {
            return (
              <InventoryItemCard
                key={inventoryStockItem.id || index}
                inventoryStockItem={inventoryStockItem}
                fetchInventoryData={fetchInventoryData}
              />
            );
          })}
      </section>
    </main>
  );
}
