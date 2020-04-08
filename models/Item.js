const mongoose = require("mongoose");
const {Schema} = mongoose;

const itemSchema = new mongoose.Schema({
  username: String,
  name: String,
  amount: Number
});

 mongoose.model("Item",itemSchema);
