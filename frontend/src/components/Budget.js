import React, { useState, useEffect } from "react";
import { createBudget, getBudgets } from "../services/api";

const Budget = () => {
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await getBudgets();
      setBudgets(response.data);
    } catch (error) {
      setMessage("Error al cargar presupuestos");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBudget(amount);
      setMessage("Presupuesto creado exitosamente");
      fetchBudgets();
    } catch (error) {
      setMessage("Error al crear presupuesto");
    }
  };

  return (
    <div>
      <h2>Establecer Presupuesto</h2>
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
        <button type="submit">Crear Presupuesto</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Presupuestos</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {budget.description}: ${budget.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;