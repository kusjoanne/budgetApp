const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const bodyParser = require('body-parser')

module.exports = (app) => {
  app.get('/api/items', async (req,res) =>{
    const items = await Item.find();
    return res.status(200).send(items);
  });

  app.post('/api/items', async (req, res) => {
    console.log(req.body);
    const itemName = req.body.itemName;
    const itemAmount = req.body.itemAmount;
    const itemDate = req.body.itemDate;
    console.log(itemName + " " + itemAmount + " " + itemDate);

    const item = {
      name: itemName,
      amount: itemAmount
    };

    // item.save();

    let item2 = await Item.create(item);
    return res.status(201).send({
      error: false,
      item2
    })
  });
};
