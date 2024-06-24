import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const register = (username, email, password) => {
  return api.post("/register", { username, email, password });
};

export const login = (email, password) => {
  return api.post("/login", { email, password });
};
