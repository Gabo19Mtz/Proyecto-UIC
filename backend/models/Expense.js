const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Budget = require("./Budget");

const Expense = sequelize.define("Expense", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  budgetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Budget,
      key: "id",
    },
  },
});

module.exports = Expense;
