const { db, User, Stock, Transaction, Portfolio } = require("../server/db");
const users = require("./data/user.json");
const stocks = require("./data/stock.json");
const transactions = require("./data/transaction.json");
const portfolios = require("./data/portfolio.json");
const { green, red } = require("chalk");

const seed = async () => {
  await db.sync({ force: true });

  await User.bulkCreate(users);
  await Stock.bulkCreate(stocks);
  await Transaction.bulkCreate(transactions);
  await Portfolio.bulkCreate(portfolios);

  console.log(green("Seeding success!"));
  db.close();
};

seed().catch((err) => {
  console.error(red("Oh noes! Something went wrong!"));
  console.error(err);
  db.close();
});

module.exports = seed;
