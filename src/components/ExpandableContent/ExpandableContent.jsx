import "./ExpandableContent.scss";
import { useState } from "react";

export default function ExpandableContent({ entity, content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="expandable">
      <button className="expandable__button" onClick={toggleExpand}>
        {isExpanded ? `Hide ${entity}` : `Show ${entity} `}
      </button>
      {isExpanded && <div className="expandable__content">{content}</div>}
    </div>
  );
}
