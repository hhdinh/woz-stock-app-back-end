const Sequelize = require("sequelize");
const db = require("../db");
const Stock = require("./Stock");

const Portfolio = db.define("portfolio", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
});

Portfolio.getPortfolioStocks = async (portfolio) => {
  console.log("Portfolio.getPortfolioStocks => portfolio", portfolio.length);
  const stocks = [];
  let symbols = "";

  for (let i = 0; i < portfolio.length; i++) {
    const item = portfolio[i];
    const stock = await Stock.findByPk(item.stockId);

    symbols += `${stock.symbol},`;

    stocks.push({
      stockId: item.stockId,
      symbols: stock.symbol,
      name: stock.name,
      quantity: item.quantity,
    });
  }
  // remove white space at the end
  symbols = symbols.slice(0, -1);

  const portfolioStocks = { symbols, stocks };

  return portfolioStocks;
};

module.exports = Portfolio;
