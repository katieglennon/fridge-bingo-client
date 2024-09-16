import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo">
      <p className="logo__fridge">
        <span className="logo__letter logo__letter--f">f</span>
        <span className="logo__letter logo__letter--r">r</span>
        <span className="logo__letter logo__letter--i">i</span>
        <span className="logo__letter logo__letter--d">d</span>
        <span className="logo__letter logo__letter--g">g</span>
        <span className="logo__letter logo__letter--e">e</span>
      </p>
      <span className="logo__bingo">bingo</span>
    </div>
  );
}
