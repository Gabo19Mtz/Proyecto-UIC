import React, { useState, useEffect } from "react";
import { createExpense, getExpenses } from "../services/api";
import { getBudgets } from "../services/api";

const Expense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [budgetId, setBudgetId] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses({ budgetId });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error al obtener gastos:", error);
      }
    };

    const fetchBudgets = async () => {
      try {
        const response = await getBudgets();
        setBudgets(response.data);
      } catch (error) {
        console.error("Error al obtener presupuestos:", error);
      }
    };

    fetchBudgets();
    if (budgetId) {
      fetchExpenses();
    }
  }, [budgetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createExpense({ description, amount, budgetId });
      setExpenses([...expenses, response.data.expense]);
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Error al crear gasto:", error);
    }
  };

  return (
    <div>
      <h2>Gastos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descripción del gasto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          required
        >
          <option value="">Seleccione un presupuesto</option>
          {budgets.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
        <button type="submit">Crear Gasto</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
