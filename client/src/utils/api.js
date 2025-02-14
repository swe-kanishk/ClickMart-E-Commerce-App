import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export const postData = async (url, formData) => {
    try {
        const res = await axios.post(`${apiUrl}${url}`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        return res.data; // Axios automatically parses JSON
    } catch (error) {
        console.error("Error in postData:", error);
        throw error.response?.data || error.message; // Return error response or message
    }
};