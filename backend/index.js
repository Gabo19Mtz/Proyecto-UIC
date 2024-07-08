const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/database");
const User = require("./models/User");
const Budget = require("./models/Budget");
const Expense = require("./models/Expense");

const app = express();
const port = 3001;
const secretKey = "G@boFerMTZ191203ññ$%";

app.use(cors());
app.use(express.json());

// Sincronización de los modelos
sequelize
  .sync()
  .then(() => {
    console.log("Base de datos y tablas sincronizadas");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

// Ruta para el registro de usuarios
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
});

// Ruta para el inicio de sesión
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
});

// Ruta para crear presupuestos
app.post("/budgets", async (req, res) => {
  const { name, amount } = req.body;

  try {
    const budget = await Budget.create({
      name,
      amount,
    });
    res
      .status(201)
      .json({ message: "Presupuesto creado exitosamente", budget });
  } catch (error) {
    console.error("Error al crear presupuesto:", error);
    res
      .status(500)
      .json({ message: "Error al crear presupuesto", error: error.message });
  }
});

// Ruta para obtener presupuestos
app.get("/budgets", async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error al obtener presupuestos:", error);
    res
      .status(500)
      .json({ message: "Error al obtener presupuestos", error: error.message });
  }
});

// Ruta para crear gastos
app.post("/expenses", async (req, res) => {
  const { description, amount, budgetId } = req.body;

  try {
    const expense = await Expense.create({
      description,
      amount,
      budgetId,
    });
    res.status(201).json({ message: "Gasto creado exitosamente", expense });
  } catch (error) {
    console.error("Error al crear gasto:", error);
    res
      .status(500)
      .json({ message: "Error al crear gasto", error: error.message });
  }
});

// Ruta para obtener gastos por presupuesto
app.get("/expenses", async (req, res) => {
  const { budgetId } = req.query;

  try {
    const expenses = await Expense.findAll({ where: { budgetId } });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error al obtener gastos:", error);
    res
      .status(500)
      .json({ message: "Error al obtener gastos", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
