
import React from "react";
import ListItem from "./ListItem";

const ListContainer = ({ lists }) => {
  // Separate lists based on list_number
  const list1 = lists.filter((list) => list.list_number === 1);
  const list2 = lists.filter((list) => list.list_number === 2);

  return (
    <div className="list-container">
      
      {/* List 1 Section */}
      <div className="list-column">
        <h2>List 1: {list1.length} Items</h2>
        {list1.length === 0 ? (
          <div>No items found for List 1.</div>
        ) : (
          <div className="list-items">
            {list1.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        )}
      </div>

      {/* List 2 Section */}
      <div className="list-column">
        <h2>List 2: {list2.length} Items</h2>
        {list2.length === 0 ? (
          <div>No items found for List 2.</div>
        ) : (
          <div className="list-items">
            {list2.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListContainer;
