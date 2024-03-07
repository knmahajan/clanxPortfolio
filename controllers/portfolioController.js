const Portfolio = require('../models/Portfolio');
const Trade = require('../models/Trade');
const Stock = require('../models/Stock');

exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne().populate('trades');
        res.json({ success: true, data: portfolio });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getHoldings = async (req, res) => {
    try {
        // Fetch portfolio with populated trades
        const portfolio = await Portfolio.findOne().populate({
            path: 'trades',
            populate: { path: 'stock' }
        });

        // Calculate holdings
        const holdings = {};
        portfolio.trades.forEach(trade => {
            if (!holdings[trade.stock.stockId]) {
                holdings[trade.stock.stockId] = {
                    quantity: 0,
                    avgPrice: 0
                };
            }
            if (trade.type === 'BUY') {
                holdings[trade.stock.stockId].quantity += trade.quantity;
                holdings[trade.stock.stockId].avgPrice += trade.quantity * trade.price;
            } else {
                holdings[trade.stock.stockId].quantity -= trade.quantity;
            }
        });

        // Calculate average buying price
        Object.keys(holdings).forEach(stockId => {
            holdings[stockId].avgPrice /= holdings[stockId].quantity;
        });

        res.json({ success: true, data: holdings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getCumulativeReturns = async (req, res) => {
    try {
        // Fetch portfolio trades
        const portfolio = await Portfolio.findOne().populate({
            path: 'trades',
            populate: { path: 'stock' }
        });

        // Calculate cumulative returns
        let initialPrice = 0;
        let finalPrice = 100; // Assuming final price for simplicity
        portfolio.trades.forEach(trade => {
            if (trade.type === 'BUY') {
                initialPrice += trade.price * trade.quantity;
            }
        });
        const cumulativeReturn = ((finalPrice - initialPrice) / initialPrice) * 100;

        res.json({ success: true, data: { cumulativeReturn } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.addTrade = async (req, res) => {
    try {
        const { stock, date, price, type } = req.body;
        const newTrade = new Trade({ stock, date, price, type });
        await newTrade.save();

        const portfolio = await Portfolio.findOne();
        portfolio.trades.push(newTrade);
        await portfolio.save();

        res.json({ success: true, data: newTrade });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateTrade = async (req, res) => {
    try {
        const { id, date, price, type } = req.body;
        const updatedTrade = await Trade.findByIdAndUpdate(id, { date, price, type }, { new: true });
        res.json({ success: true, data: updatedTrade });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.removeTrade = async (req, res) => {
    try {
        const { id } = req.body;
        await Trade.findByIdAndDelete(id);

        const portfolio = await Portfolio.findOne();
        portfolio.trades = portfolio.trades.filter(trade => trade.toString() !== id);
        await portfolio.save();

        res.json({ success: true, message: 'Trade removed successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
