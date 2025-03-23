import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
  try {
    const res = await axios.post(`${apiUrl}${url}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

export const uploadImage = async (url, updatedData, credentials) => {
  try {
    const res = await axios.put(`${apiUrl}${url}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImages = async (url, updatedData, credentials) => {
  try {
    const res = await axios.post(`${apiUrl}${url}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editData = async (url, updatedData, credentials) => {
  try {
    const res = await axios.put(`${apiUrl}${url}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImages = async (url, imgUrl, credentials) => {
  try {
    const res = await axios.delete(`${apiUrl}${url}?img=${imgUrl}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteData = async (url, credentials) => {
  try {
    const res = await axios.delete(`${apiUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMultipleData = async (url, ids, credentials) => {
  try {
    const res = await axios.delete(`${apiUrl}${url}`, {
      data: { ids },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials,
    });
    return res;
  } catch (error) {
    console.error("Delete multiple data error:", error);
  }
};
