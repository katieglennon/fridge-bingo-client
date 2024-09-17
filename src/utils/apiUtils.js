import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const getInventoryList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/inventory/`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
