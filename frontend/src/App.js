import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Budget from "./components/Budget";
import Expense from "./components/Expense";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/budgets" element={<Budget />} />
        <Route path="/expenses" element={<Expense />} />
      </Routes>
    </Router>
  );
}

export default App;
