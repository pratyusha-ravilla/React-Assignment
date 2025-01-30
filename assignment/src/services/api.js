

import axios from "axios";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

// Fetch lists from API
export const fetchLists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch lists");
  }
};

// Update the selected lists
export const updateLists = async (updatedLists) => {
  try {
    const response = await axios.post("https://apis.ccbp.in/list-creation/lists/update", {
      lists: updatedLists,
      user_id: "your-user-id",
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update lists");
  }
};