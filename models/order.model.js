const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customer_name: { type: String },
  address: { type: String },
  phone: { type: Number, min: 9 },
  quantity: { type: Number, default: 1 },
  pizzaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pizza",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
