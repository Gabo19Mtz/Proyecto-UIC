const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Budget = sequelize.define("Budget", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Budget;
