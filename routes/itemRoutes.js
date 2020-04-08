const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports = (app) => {
  app.get('/api/items', async (req,res) =>{
    const items = await Item.find();
    return res.status(200).send(items);
  });
};
