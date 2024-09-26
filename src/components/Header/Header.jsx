import "./Header.scss";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router-dom";

export default function Header({ theme, handleClick }) {
  return (
    <>
      <header className={`header ${theme === "dark" ? "header--dark" : ""}`}>
        <button
          className={`header__btn ${
            theme === "dark" ? "header__btn--dark" : ""
          }`}
          onClick={handleClick}
        ></button>
        <Link className="header__logo-link" to="/">
          <Logo />
        </Link>
        <nav>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            Inventory
          </NavLink>
          <NavLink
            to="/recipes/new"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            Recipe Generator
          </NavLink>
          <NavLink
            to="/recipes/saved"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            Recipes
          </NavLink>
        </nav>
      </header>
    </>
  );
}
