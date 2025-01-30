

import React, { useState, useEffect } from "react";
import "./ListManagement.css";

const ListManagement = ({ selectedLists, cancelSelection }) => {
  const [list1, setList1] = useState(selectedLists[0] ? { ...selectedLists[0], items: selectedLists[0].items || [] } : { name: "List 1", items: [] });
const [list2, setList2] = useState(selectedLists[1] ? { ...selectedLists[1], items: selectedLists[1].items || [] } : { name: "List 2", items: [] });

  const [middleList, setMiddleList] = useState([]);


  useEffect(() => {
    console.log("Selected Lists:", selectedLists);
    setList1(selectedLists[0] ? { ...selectedLists[0], items: selectedLists[0].items || [] } : { name: "List 1", items: [] });
    setList2(selectedLists[1] ? { ...selectedLists[1], items: selectedLists[1].items || [] } : { name: "List 2", items: [] });
  }, [selectedLists]);
  

  const moveItem = (fromList, setFromList, toList, setToList, item) => {
    setFromList({ ...fromList, items: fromList.items.filter((i) => i !== item) });
    setToList({ ...toList, items: [...toList.items, item] });
  };

  return (
    <div className="list-management-container">
      <h2>List Creation</h2>

      <div className="lists-container">
        <div className="list-box">
          <h4>{list1.name}</h4>
          {list1.items.map((item) => (
            <div key={item.id} className="list-item">
              {item.name}
              <button onClick={() => moveItem(list1, setList1, middleList, setMiddleList, item)}>
                →
              </button>
            </div>
          ))}
        </div>

        <div className="list-box middle-list">
          <h4>New List</h4>
          {middleList.map((item) => (
            <div key={item.id} className="list-item">
              {item.name}
              <button onClick={() => moveItem(middleList, setMiddleList, list1, setList1, item)}>
                ←
              </button>
              <button onClick={() => moveItem(middleList, setMiddleList, list2, setList2, item)}>
                →
              </button>
            </div>
          ))}
        </div>

        <div className="list-box">
          <h4>{list2.name}</h4>
          {list2.items.map((item) => (
            <div key={item.id} className="list-item">
              {item.name}
              <button onClick={() => moveItem(list2, setList2, middleList, setMiddleList, item)}>
                ←
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="buttons">
        <button onClick={cancelSelection}>Cancel</button>
      </div>
    </div>
  );
};

export default ListManagement;




