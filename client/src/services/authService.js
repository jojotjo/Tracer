import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginUser = (data) => {
  return axios.post(`${API}/auth/login`, data, { withCredentials: true });
};

export const signupUser = (data) => {
  return axios.post(`${API}/auth/signup`, data, { withCredentials: true });
};
