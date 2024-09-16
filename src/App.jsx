import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import AddIngredient from "./components/AddIngredientForm/AddIngredientForm";

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
      <AddIngredient />
      <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
