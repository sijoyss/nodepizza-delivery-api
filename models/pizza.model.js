const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
  pizza_name: { type: String },
  ingredients: { type: [String] },
  size: { type: Number },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
