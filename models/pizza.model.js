const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
  pizza_name: { type: String },
  ingredients: { type: [String] },
  size: { type: Number },
});

module.exports = mongoose.model("Pizza", pizzaSchema);
