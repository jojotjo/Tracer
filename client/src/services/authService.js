import axios from "axios";

const API = process.env.VITE_API_URL;

export const loginUser = (data) => {
  return axios.post(`${API}/auth/login`, data);
};

export const signupUser = (data) => {
  return axios.post(`${API}/auth/signup`, data);
};
