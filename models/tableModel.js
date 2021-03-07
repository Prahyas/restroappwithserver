const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tId: { type: String },
  tableName: { type: String, required: true },
  reserved: { type: String, required: true },
});

module.exports = Table = mongoose.model("table", tableSchema);
