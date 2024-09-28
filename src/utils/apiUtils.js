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
    const response = await axios.patch(
      `${apiUrl}/api/recipes/${recipeId}/save`,
      {
        is_saved: isSaved,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const rateRecipeRequest = async (recipeId, rating) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/api/recipes/${recipeId}/rate`,
      {
        rating: rating,
      }
    );
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

export const getSavedRecipes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/recipes/saved`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/recipes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editStockItem = async (id, stockItemData) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/api/inventory/${id}`,
      stockItemData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const deleteStockItem = async (id) => {
  try {
    await axios.delete(`${apiUrl}/api/inventory/${id}`);
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const addRecipeImage = async (recipeId, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.patch(
      `${apiUrl}/api/recipes/${recipeId}/image/upload`,
      formData,
      config
    );
    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const generateRecipeImageRequest = async (recipeId, prompt) => {
  try {
    const response = await axios.patch(
      `${apiUrl}/api/recipes/${recipeId}/image/generate`,
      {
        prompt,
      }
    );
    console.log("Image generated successfully", response.data);
  } catch (error) {
    console.error("Error generating image:", error);
  }
};
