import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const res = await axios.post(`${apiUrl}${url}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error in postData:", error);
    throw error.response?.data || error.message;
  }
};

export const getData = async (url, credentials) => {
  try {
    const res = await axios.get(`${apiUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials, // Ensure credentials are sent if required
    });

    return res.data;
  } catch (error) {
    console.error("Error in getData:", error);
    throw error.response?.data || error.message;
  }
};
