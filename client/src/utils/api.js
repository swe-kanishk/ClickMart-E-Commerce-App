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
    return error?.response?.data
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
    return error?.response?.data
  }
};

export const uploadImage = async (url, updatedData, credentials) => {
  try {
    const res = await axios.put(`${apiUrl}${url}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
      credentials
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export const editData = async (url, updatedData, credentials) => {
  console.log(updatedData)
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

export const deleteData = async (url, credentials) => {
  try {
    const res = await axios.delete(`${apiUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      credentials
    })
    return res
  } catch (error) {
    console.log(error)
  }
}