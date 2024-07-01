import axios from "axios";

const API_URL = "http://localhost:3001";

export const register = (username, email, password) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const createBudget = (amount, description) => {
  return axios.post(`${API_URL}/budgets`, { amount });
};

export const getBudgets = () => {
  return axios.get(`${API_URL}/budgets`);
};

export const createExpense = (amount, description) => {
  return axios.post(`${API_URL}/expenses`, { amount, description });
};

export const getExpenses = () => {
  return axios.get(`${API_URL}/expenses`);
};
