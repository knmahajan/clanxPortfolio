const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Route to get the entire portfolio with trades
router.get('/', portfolioController.getPortfolio);

// Route to get holdings in an aggregate view
router.get('/holdings', portfolioController.getHoldings);

// Route to get cumulative returns
router.get('/returns', portfolioController.getCumulativeReturns);

// Route to add a new trade
router.post('/addTrade', portfolioController.addTrade);

// Route to update an existing trade
router.post('/updateTrade', portfolioController.updateTrade);

// Route to remove a trade
router.post('/removeTrade', portfolioController.removeTrade);

module.exports = router;
