const mongoose = require('mongoose');
const ItemDate = mongoose.model('ItemDate');
const Item = mongoose.model('Item');
const Balance = mongoose.model('Balance');
const bodyParser = require('body-parser')

module.exports = (app) => {
  app.get('/api/date', async (req,res) =>{
    let itemDate = await ItemDate.find().sort('-date');
    return res.status(200).send(itemDate);
  })

  app.post('/api/date', async (req, res) => {
    const itemName = req.body.itemName;
    const itemAmount = req.body.itemAmount;
    const itemDate = req.body.itemDate;

    const item = new Item({
      name: itemName,
      amount: itemAmount
    });
    item.save();

    let date = await ItemDate.findOne({date:itemDate});
    if(date){
        date.items.push(item);
        date.save();
      //if we don't create a new date with that item
    }else{
      const newDate = new ItemDate({
        date: itemDate,
        items: [item]
      });
      newDate.save();
    }

    //updateBalance
    let latestBalance = await Balance.findOne().sort('-updateDate');
    const newBalanceAmount = latestBalance.balance-itemAmount;
    const updatedBalance = new Balance({
      balance:newBalanceAmount,
      updateDate: Date()
    });
    updatedBalance.save();
  })

  app.post('/api/date/edit/:item_date/:item_id', async (req,res) => {
    const itemID = req.params.item_id;
    const itemDate = req.params.item_date;
    const formData = req.body;
    console.log(formData);
  })

  app.post('/api/date/delete/:item_date/:item_id', async (req,res) => {
    const itemID = req.params.item_id;
    const itemDate = req.params.item_date;
    let latestBalance = await Balance.findOne().sort('-updateDate');

    await ItemDate.findOne({date:itemDate}, (err,date) => {
      if(date){
        const currentItem = date.items.id(itemID);

        //Update Balance
        //We probably don't need to keep a new record for each time the balance is updated.
        const newBalanceAmount = latestBalance.balance+currentItem.amount;
        const updatedBalance = new Balance({
          balance:newBalanceAmount,
          updateDate: Date()
        });
        updatedBalance.save();

        //If there's no more items delete date
        if(date.items.length===1){
          date.remove();
        } else{
        //Remove Item from this Date
          currentItem.remove();
        }

        date.save(err => {
          if(!err)
            //how to do this without page refresh via react
            res.redirect('/');
        });
      }
    });
  })
}
