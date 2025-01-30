
import React from "react";
import "./ListItem.css";

const ListItem = ({ list, onSelect, isSelected }) => {
  return (
    <li
      className={`list-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(list)}
    >
      <h5>{list.name}</h5>
      <p>{list.description}</p>
    </li>
  );
};

export default ListItem;
