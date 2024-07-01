import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Budget from "./components/Budget";
import Expense from "./components/Expense";
import "./Auth.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path="/expenses" element={<Expense />} />
      </Routes>
    </Router>
  );
};

export default App;
