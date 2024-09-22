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
