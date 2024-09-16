import "./Header.scss";
import Logo from "../Logo/Logo";

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
        <Logo />
      </header>
    </>
  );
}
