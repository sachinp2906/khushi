const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Normal', 'VIP'], required: true },
  option: { type: String, enum: ['Hourly', 'Weekly', 'Monthly'], required: true },
});

module.exports = mongoose.model('service', serviceSchema);
