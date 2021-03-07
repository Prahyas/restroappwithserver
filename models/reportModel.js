const mongoose = require("mongoose");
const reportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  tId: { type: String },
  tableName: { type: String, required: true },
  oId: { type: String, required: true },
  orderId: { type: String, required: true },
  displayName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerContact: { type: Number, required: true },
  date: { type: String, required: true },
  finalPrice: { type: String, required: true },
  totalQuantity: { type: String, required: true },
  cart: [
    {
      itemName: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String, required: true },
      totalPrice: { type: String, required: true },
      _id: { type: String, required: true },
    },
  ],
});

module.exports = Report = mongoose.model("report", reportSchema);
