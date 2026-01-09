export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
};
