const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 3001;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gastodb",
  password: "tu_contraseña",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Hola, mundo!");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
