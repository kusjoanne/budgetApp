const mongoose = require('mongoose');
const {Schema} = mongoose;

//this shouldn't be in here
const itemSchema = new mongoose.Schema({
  username: String,
  name: String,
  amount: Number
});

const itemDateSchema = new mongoose.Schema({
  username: String,
  date: Date,
  items: [itemSchema]
})

mongoose.model('ItemDate',itemDateSchema);
