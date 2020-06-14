const router = require('express').Router();
const { Transaction, Stock  }  = require('../db');

//GET /api/transactions/:userId
router.get('/:userId', async (req, res, next ) => {
    try {
      const transactions = await Transaction.findAll({
        where: {
          userId: req.params.userId
        },
        include: [{ model: Stock }]
      });
      if(transactions.length) {
        res.send(transactions);
      }
      else {
        res.status(404).send('No transactions found for this user');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  router.post('/', async(req, res, next) => {
    try {
      const foundStock = await Stock.findOne({
        where:{
          symbol: req.body.symbol
        }
      });
      await Transaction.create({
        userId: req.user.id,
        stockId: foundStock.id,
        price: req.body.price,
        type: req.body.type,
        totalValue: req.body.totalValue,
        quantity: req.body.quantity
      });
      const transactions = await Transaction.findAll({
        where: {
          userId: req.user.id
        },
        include: [{ model: Stock }]
      });
      if(transactions.length) {
        res.send(transactions);
      }
      else {
        res.status(404).send('No transactions found for this user');
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  module.exports = router;