const router = require("express").Router();
const { Portfolio, Stock } = require("../db");

// GET /api/portfolio/:userId
router.get('/:userId', async(req, res, next) => {
  try {
    
    const portfolio = await Portfolio.findAll({
      where: {
        userId: req.params.userId
      }
    });
    console.log("portfolio", portfolio.length)
    if(portfolio.length) {
      const portfolioStocks = await Portfolio.getPortfolioStocks(portfolio);
      res.send(portfolioStocks);
    }
    else {
      res.status(404).send("No portfolio found");
    }
  } catch (error) {
    next(error);
  }
});
// POST /api/portfolio/
router.post('/', async(req, res, next) => {
  try {
    console.log('here')
    const [stock, wasCreated] = await Stock.findOrCreate({
      where: {
        symbol: req.body.symbol,
        name: req.body.name
      }
    });
    if(!wasCreated){
      const [updateStockInPortfolio, wasCreated] = await Portfolio.findOrCreate({
        where: {
          stockId: stock.id,
          userId: req.user.id
        }
      })
      if(!wasCreated) {
        const total = updateStockInPortfolio.quantity + req.body.quantity;
        await updateStockInPortfolio.update({ quantity: total });
      }
    }
    else {
      const foundStock = await Stock.findByPk(stock.id);
      await Portfolio.create({
        stockId: foundStock.id,
        userId: req.user.id,
        quantity: req.body.quantity
      });
    }
    // Get updated portfolio
    const updatedPortfolio = await Portfolio.findAll({
      where: {
        userId: req.user.id
      }
    });
    // Get symbols and stocks
    if(updatedPortfolio.length) {
      const portfolioStocks = await Portfolio.getPortfolioStocks(updatedPortfolio);
      res.send(portfolioStocks);
    }
    else {
      res.status(404).send('No portfolio found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
