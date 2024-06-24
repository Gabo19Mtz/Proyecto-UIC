const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
const secretKey = "G@boFerMTZ191203ññ$%";

// Configuración de la base de datos
const sequelize = new Sequelize("proyectouic", "postgres", "gabo191203", {
  host: "localhost",
  dialect: "postgres",
});

// Middleware
app.use(cors());
app.use(express.json());

// Definición del modelo de Usuario
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Base de datos y tabla de usuarios sincronizadas");
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
