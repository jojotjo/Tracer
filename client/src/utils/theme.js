// utils/theme.js

export const getTheme = () => {
  return localStorage.getItem("darkMode") === "true" ? "dark" : "light";
};

export const setTheme = (theme) => {
  const isDark = theme === "dark";
  localStorage.setItem("darkMode", isDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleTheme = () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  return newTheme;
};