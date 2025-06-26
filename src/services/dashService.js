import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const dashService = {
  AllPlanCount: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/plans/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch plancount" };
    }
  },

  TotalPremium: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/plans/sum`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch sum of plan" };
    }
  },
  TotalClaims: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/claims/total`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch total claim" };
    }
  },
  AllUserCount: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/user/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch all user count" }
      );
    }
  },
  AllAprovedClaim: async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_URL}/claims/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to fetch all approved claim",
        }
      );
    }
  },
};
