import "./LetterHover.scss";
import { useState } from "react";

export default function LetterHover({ text }) {
  const [hovered, setHovered] = useState(false);
  const colors = [
    "#ff3cc7",
    "#6b7fd7",
    "#f1db4b",
    "#09bc8a",
    "#f81212",
    "#ed7d3a",
  ];

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover-effect"
    >
      {hovered
        ? text.split("").map((char, index) => (
            <span key={index} style={{ color: colors[index % colors.length] }}>
              {char}
            </span>
          ))
        : text}
    </div>
  );
}
