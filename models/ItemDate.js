const mongoose = require('mongoose');
const {Schema} = mongoose;
const itemSchema = require('./Item');

const itemDateSchema = new mongoose.Schema({
  username: String,
  date: Date,
  items: [itemSchema]
})

mongoose.model('ItemDate',itemDateSchema);
