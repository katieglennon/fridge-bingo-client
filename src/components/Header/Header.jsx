import "./Header.scss";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router-dom";
import LetterHover from "../LetterHover/LetterHover";

export default function Header({ theme, handleClick }) {
  return (
    <>
      <header className={`header ${theme === "dark" ? "header--dark" : ""}`}>
        <div className="header__container">
          <button
            className={`header__btn ${
              theme === "dark" ? "header__btn--dark" : ""
            }`}
            onClick={handleClick}
          ></button>
          <Link className="header__logo-link" to="/">
            <Logo />
          </Link>
        </div>
        <nav className="header__nav">
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            <LetterHover text="Inventory" />
          </NavLink>
          <NavLink
            to="/recipes/new"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            <LetterHover text="Recipe Generator" />
          </NavLink>
          <NavLink
            to="/recipes/saved"
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            <LetterHover text="Favourites" />
          </NavLink>
          <NavLink
            to="/recipes"
            end
            className={({ isActive }) =>
              isActive
                ? "header__nav-link header__nav-link--active"
                : "header__nav-link"
            }
          >
            <LetterHover text="Recipes" />
          </NavLink>
        </nav>
      </header>
    </>
  );
}
