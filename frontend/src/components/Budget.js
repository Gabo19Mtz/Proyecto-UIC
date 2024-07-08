import React, { useState, useEffect } from "react";
import { createBudget, getBudgets } from "../services/api";

const Budget = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await getBudgets();
        setBudgets(response.data);
      } catch (error) {
        console.error("Error al obtener presupuestos:", error);
      }
    };

    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBudget({ name, amount });
      setBudgets([...budgets, response.data.budget]);
      setName("");
      setAmount("");
    } catch (error) {
      console.error("Error al crear presupuesto:", error);
    }
  };

  return (
    <div>
      <h2>Presupuestos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del presupuesto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Crear Presupuesto</button>
      </form>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {budget.name} - {budget.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Budget;
