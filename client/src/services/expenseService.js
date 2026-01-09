import api from "./api";

export const addExpense = (data) => {
  return api.post("/expenses", data);
};

export const getExpenses = () => {
  return api.get("/expenses");
};

export const deleteExpense = (id) => {
  return api.delete(`/expenses/${id}`);
};

export const updateExpense = (id, data) => {
  return api.put(`/expenses/${id}`, data);
};
