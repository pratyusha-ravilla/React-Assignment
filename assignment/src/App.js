
import React, { useState, useEffect } from "react";
import ListCreation from "./components/ListCreation";
import { fetchLists } from "./services/api"; 
import "./App.css";

const App = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list3, setList3] = useState(null); 

  useEffect(() => {
    const getLists = async () => {
      try {
        const data = await fetchLists();
        console.log("API Response:", data);
        setLists(Array.isArray(data?.lists) ? data.lists : []);
      } catch (err) {
        console.error("Error fetching lists:", err);
        setError("Failed to fetch lists");
      } finally {
        setLoading(false);
      }
    };

    getLists();
  }, []);



// // Handle creating List 3
  const handleCreateList = (selectedLists) => {
    if (selectedLists.length !== 2) {
      alert("You should select exactly 2 lists to create a new list.");
      return;
    }
  
    // Create an empty List 3 with selected lists
    setList3({
      list_number: 3,
      items: [],
      selectedLists: selectedLists,
    });
  };
   // Handle updating List 3 with new items
  
  const handleUpdateLists = (updatedList) => {
    if (!list3) {
     
      console.error("List 3 is not created yet.");
      return;
    }
  
   
    const updatedLists = [...lists];
  

    const filteredLists = updatedLists.filter((list) => list.list_number !== 3);
  
    // Add List 3 with the updated items
    filteredLists.push({
      list_number: 3,
      items: updatedList,
      selectedLists: list3.selectedLists, 
    });
  
    
    filteredLists.sort((a, b) => a.list_number - b.list_number);
  
   
    setLists(filteredLists);
    setList3(null); 
  };
  
  // Handle Cancel: Reset List 3
  const handleCancel = () => {
    setList3(null); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <ListCreation
        lists={lists}
        onCreateList={handleCreateList}
        onUpdateLists={handleUpdateLists} 
        onCancel={handleCancel} 
        list3={list3}
      />
    </div>
  );
};

export default App;
