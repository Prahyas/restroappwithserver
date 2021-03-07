const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  restaurantName: { type: String },
  address: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  serviceCharge: { type: Number },
  vat: { type: Number },
});

module.exports = Detail = mongoose.model("detail", detailSchema);
