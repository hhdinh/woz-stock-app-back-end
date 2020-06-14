const router = require("express").Router();
const { Stock } = require("../db")
const axios = require("axios");
const API_TOKEN = process.env.API_TOKEN || require("../../secret");

// Get /api/iex/stock/:symbols
router.get('/stock/:symbols', async (req, res, next) => {
    try {
        console.log("req.params.symbols, req.params.symbols")
        const symbols =req.params.symbols;
        console.log("req.params.symbols, req.params.symbols")
        const queryStr = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&range=lm&last=5&token=${API_TOKEN}`;
        const { data } = await axios.get(queryStr);
        const filteredIexData = Stock.filterIexData(data, symbols);
        res.json(filteredIexData);
    } catch (error) {
        next(error);
    }
});

module.exports = router;