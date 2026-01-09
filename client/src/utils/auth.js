import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isTokenExpired = () => {
  const user = getUserFromToken();
  if (!user?.exp) return true;

  // exp is in seconds
  const currentTime = Date.now() / 1000;
  return user.exp < currentTime;
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  return !isTokenExpired();
};
