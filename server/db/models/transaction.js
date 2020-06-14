const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [["BUY", "SELL"]],
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  totalValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Transaction;
