const mongoose = require('mongoose');

// Schema for Trade model
const TradeSchema = new mongoose.Schema({
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['BUY', 'SELL'],
        required: true
    }
});

module.exports = mongoose.model('Trade', TradeSchema);
