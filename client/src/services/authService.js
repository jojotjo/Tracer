import api from "./api"; // your custom axios instance

// Signup user
export const signupUser = async (data) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data; // return only the data part
  } catch (error) {
    // Handle errors gracefully
    if (error.response) {
      // Server responded with a status code outside 2xx
      throw new Error(error.response.data.message || "Signup failed");
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("No response from server. Please try again.");
    } else {
      // Something else happened
      throw new Error(error.message);
    }
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data; // return only the data part
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message);
    }
  }
};
