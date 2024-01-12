const mongoose = require('mongoose');

const servicePriceOptionsSchema = new mongoose.Schema({
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['Hourly', 'Weekly', 'Monthly'], required: true },
});

module.exports = mongoose.model('ServicePriceOptions', servicePriceOptionsSchema);
