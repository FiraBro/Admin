import axios from "axios";

// Make sure to define how you get the token, e.g., from localStorage or context
const token = localStorage.getItem("token"); // Example

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/claims";

export const claimService = {
  updateClaimStatus: async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${API_URL}/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Updating claim status failed" };
    }
  },

  getAllClaims: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/all-claims`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Fetching claims failed" };
    }
  },
};
