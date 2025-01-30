
import React, { useState, useEffect } from "react";
import "./ListCreation.css";

const ListCreation = ({ lists, onUpdateLists, onCancel, list3 }) => {
  const [selectedLists, setSelectedLists] = useState([]); 
  const [isListCreated, setIsListCreated] = useState(false); 
  const [list3Items, setList3Items] = useState([]); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    // If list3 exists, set up the selected lists and list3 items from props
    if (list3) {
      setIsListCreated(true);
      setSelectedLists(list3.selectedLists);
      setList3Items(list3.items);
    } else {
      setIsListCreated(false);
      setSelectedLists([]);
      setList3Items([]);
    }
  }, [list3]);

  // Handle list selection (User selects two lists)
  const handleListSelection = (listNumber) => {
    let updatedLists = [...selectedLists];

    if (updatedLists.includes(listNumber)) {
      updatedLists = updatedLists.filter((num) => num !== listNumber); // Deselect if already selected
    } else if (updatedLists.length < 2) {
      updatedLists.push(listNumber); 
    }

    setSelectedLists(updatedLists);
  };

  // Handle Create New List button click
  const handleCreateList = () => {
    if (selectedLists.length !== 2) {
      setError("You should select exactly 2 lists to create a new list");
      return;
    }

    setIsListCreated(true);
    setList3Items([]); 
    setError(""); 
  };

  // Move items between lists
  const moveItem = (item, fromList, toList) => {
    if (toList === 3) {
      // Add item to List 3
      setList3Items([...list3Items, { ...item, list_number: 3 }]);
    } else {
      // Remove item from List 3
      setList3Items(list3Items.filter((i) => i.id !== item.id));
    }
  };

  // Cancel changes and reset state
  const handleCancelClick = () => {
    setIsListCreated(false);
    setList3Items([]);
    setSelectedLists([]);
    setError("");
    onCancel(); 
  };



  const handleUpdate = () => {
    if (!list3 || list3.items.length === 0) {
      setError("Please add items to List 3 before updating.");
      return;
    }
  
    // Send the updated list to the parent component
    onUpdateLists(list3Items);
    handleCancelClick();
  };
  
  return (
    <div className="list-creation-container">
      <div className="list-creation-header">
        <h3>List Creation</h3>
        {!isListCreated && (
          <button className="create-list-button" onClick={handleCreateList}>
            Create New List
          </button>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* List columns */}
      <div className="list-columns">
        {/* List 1 */}
        <div
          className={`list-column ${selectedLists.includes(1) ? "selected" : ""}`}
          onClick={() => handleListSelection(1)}
        >
          <h4>List 1 ({lists.filter((item) => item.list_number === 1).length} Items)</h4>
          <ul>
            {lists
              .filter((item) => item.list_number === 1)
              .map((item) => (
                <li key={item.id} className="list-item">
                  {item.name}
                  {isListCreated && (
                    <button onClick={() => moveItem(item, 1, 3)}>➡</button>
                  )}
                </li>
              ))}
          </ul>
        </div>

        {/* List 3*/}
        {isListCreated && (
          <div className="list-column middle-list">
            <h4>List 3 ({list3Items.length} Items)</h4>
            <ul>
              {list3Items.map((item) => (
                <li key={item.id} className="list-item">
                  {item.name}
                  {/* Move item from List 3 to List 1 or List 2 */}
                  <button onClick={() => moveItem(item, 3, selectedLists[0])}>⬅</button>
                  <button onClick={() => moveItem(item, 3, selectedLists[1])}>➡</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* List 2 */}
        <div
          className={`list-column ${selectedLists.includes(2) ? "selected" : ""}`}
          onClick={() => handleListSelection(2)}
        >
          <h4>List 2 ({lists.filter((item) => item.list_number === 2).length} Items)</h4>
          <ul>
            {lists
              .filter((item) => item.list_number === 2)
              .map((item) => (
                <li key={item.id} className="list-item">
                  {item.name}
                  {isListCreated && (
                    <button onClick={() => moveItem(item, 2, 3)}>➡</button>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Action buttons */}
      {isListCreated && (
        <div className="list-creation-actions">
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ListCreation;
