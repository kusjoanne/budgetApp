const mongoose = require("mongoose");
const {Schema} = mongoose;

const balanceSchema = new mongoose.Schema({
  username: String,
  balance: Number,
  updateDate: Date
});

mongoose.model("Balance", balanceSchema);
