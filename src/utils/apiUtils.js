import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || `http://localhost:3030`;

export const getInventoryList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/inventory/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/recipes/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendRecipeRequest = async (recipeRequestData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/recipes/new/`,
      recipeRequestData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const saveRecipeRequest = async (recipeId, isSaved) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/recipes/${recipeId}`, {
      is_saved: isSaved,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addStockItem = async (stockItemData) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/inventory/`,
      stockItemData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};
