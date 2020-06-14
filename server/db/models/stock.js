const Sequelize = require("sequelize");
const db = require("../db");

const Stock = db.define("stock", {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Stock.filterIexData = (data, symbols) => {
  const filteredData = [];

  symbols.split(",").forEach((symbol) => {
    symbol = symbol.toUpperCase();
    const quoteData = data[symbol].quote;

    filteredData.push({
      symbol: quoteData.symbol,
      name: quoteData.companyName,
      latestPrice: quoteData.latestPrice,
      change: quoteData.change,
      changePercent: quoteData.changePercent,
      open: quoteData.open,
    });
  });

  return filteredData;
};

module.exports = Stock;
