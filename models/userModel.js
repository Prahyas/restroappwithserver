const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  displayName: { type: String, required: true },
  adminCheck: { type: Boolean, required: true },
  address: { type: String, required: true },
  contact: { type: Number, required: true, unique: true },
});

module.exports = User = mongoose.model("user", userSchema);
