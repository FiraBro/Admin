// src/services/adminService.js
import axios from "axios";

const API_URL =
  import.meta.env.VITE_ADMIN_API_URL || "http://localhost:5000/api/v1";

export const adminService = {
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch stats" };
    }
  },

  getPlans: async () => {
    try {
      const response = await axios.get(`${API_URL}/plans`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch plans" };
    }
  },

  addPlan: async (newPlan) => {
    try {
      const response = await axios.post(`${API_URL}/plans/create`, newPlan);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to add plan" };
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
      const response = await axios.delete(`${API_URL}/plans/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete plan" };
    }
  },

  getApplications: async () => {
    try {
      const response = await axios.get(`${API_URL}/policy/admin/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch applications" };
    }
  },

  updateApplicationStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_URL}/policy/admin/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to update application status",
        }
      );
    }
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
