const Sequelize = require("sequelize");
const chalk = require("chalk");

console.log(chalk.yellow("Opening database connection"));

const database = 'stock_app_woz_u';
// const databaseURL = process.env.DATABASE_URL ||`postgres://localhost:5432/stock_app_woz_u`;
const db = new Sequelize(database, 'postgres', 'password123', {
  logging: false,
  dialect: 'postgres'
});

module.exports = db;

