const mongoose = require('mongoose');

// Schema for Portfolio model
const PortfolioSchema = new mongoose.Schema({
    trades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trade'
    }]
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
