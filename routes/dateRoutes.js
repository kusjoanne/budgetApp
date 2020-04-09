const mongoose = require('mongoose');
const Date = mongoose.model('Date');
const Item = mongoose.model('Item');
const bodyParser = require('body-parser')

module.exports = (app) => {
  app.get('/api/date', async (req,res) =>{
    let itemDate = await Date.find().sort('-date');
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

    let date = await Date.findOne({date:itemDate});
    if(date){
        date.items.push(item);
        date.save();
      //if we don't create a new date with that item
    }else{
      const newDate = new Date({
        date: itemDate,
        items: [item]
      });
      newDate.save();
    }

    //Update balance
    // Balance.findOne(function(err,latestBalance){
    //   const newBalanceAmount = latestBalance.balance-itemAmount;
    //   const updatedBalance = new Balance({
    //     username: username,
    //     balance:newBalanceAmount,
    //     updateDate: Date()
    //   });
    //   updatedBalance.save(function(err){
    //     if(err){
    //       console.log(err);
    //     } else {
    //       res.redirect("/");
    //     }
    //   });
    // }).sort('-updateDate');
  });
}
