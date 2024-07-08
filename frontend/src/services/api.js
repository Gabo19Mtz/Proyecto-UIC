import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const register = (userData) => api.post("/register", userData);
export const login = (userData) => api.post("/login", userData);
export const createBudget = (budgetData) => api.post("/budgets", budgetData);
export const getBudgets = () => api.get("/budgets");
export const createExpense = (expenseData) =>
  api.post("/expenses", expenseData);
export const getExpenses = (budgetId) =>
  api.get("/expenses", { params: { budgetId } });
