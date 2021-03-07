const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number },
});

module.exports = Menu = mongoose.model("menu", menuSchema);
