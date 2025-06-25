import axios from "axios";

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5000/api/v1";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(
      error.response?.data || { message: "An error occurred" }
    );
  }
);

export const adminService = {
  getStats: async () => {
    try {
      const response = await api.get("/stats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPlans: async () => {
    try {
      const response = await api.get("/plans");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addPlan: async (newPlan) => {
    try {
      const response = await api.post("/plans/create", newPlan);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePlan: async (id, updated) => {
    try {
      const response = await axios.put(`${API_URL}/plans/${id}`, updated);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update plan" };
    }
  },

  deletePlan: async (id) => {
    try {
      const token = localStorage.getItem("token"); // Or get it from your auth context
      const response = await axios.delete(`${API_URL}/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete plan" };
    }
  },

  getApplications: async (token) => {
    const tokens = localStorage.getItem("token");
    console.log(tokens);
    try {
      const { data } = await axios.get(`${API_URL}/policy/admin/all`, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch applications";
      throw new Error(message);
    }
  },

  updateApplicationStatus: async (id, status) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `${API_URL}/policy/admin/${id}/status`,
      { status }, // <-- body payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  getClaims: async () => {
    try {
      const response = await axios.get(`${API_URL}/claims/my-claims`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch claims" };
    }
  },

  updateClaimStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/claims/status/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to update claim status" }
      );
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch users" };
    }
  },

  updateUser: async (id, action) => {
    try {
      const response = await axios.put(
        `${API_URL}/admin/users/${id}/${action}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update user" };
    }
  },
};
