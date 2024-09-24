import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
// import AddIngredient from "./components/AddIngredientForm/AddIngredientForm";
import GenerateRecipePage from "./pages/GenerateRecipePage/GenerateRecipePage";
import HomePage from "./pages/HomePage/HomePage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import SavedRecipesPage from "./pages/SavedRecipesPage/SavedRecipesPage";
import SingleRecipePage from "./pages/SingleRecipePage/SingleRecipePage";

function App() {
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div className={`app ${theme === "dark" ? "app--dark" : ""}`}>
      <Header theme={theme} handleClick={handleClick} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<SingleRecipePage />} />
          <Route path="/recipes/saved" element={<SavedRecipesPage />} />
          <Route path="/recipes/new" element={<GenerateRecipePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
