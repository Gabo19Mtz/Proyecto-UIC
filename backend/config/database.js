const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("proyectouic", "postgres", "gabo191203", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;