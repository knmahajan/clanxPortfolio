const mongoose = require('mongoose');

// Schema for Stock model
const StockSchema = new mongoose.Schema({
    stockId: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Stock', StockSchema);
