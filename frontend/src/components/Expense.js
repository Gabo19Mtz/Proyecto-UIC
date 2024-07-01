import React, { useState, useEffect } from "react";
import { createExpense, getExpenses } from "../services/api";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (error) {
      setMessage("Error al cargar gastos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpense(amount, description);
      setMessage("Gasto registrado exitosamente");
      fetchExpenses();
    } catch (error) {
      setMessage("Error al registrar gasto");
    }
  };

  return (
    <div>
      <h2>Registrar Gasto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Monto:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Gasto</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Gastos</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;