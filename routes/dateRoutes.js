const mongoose = require('mongoose');
const ItemDate = mongoose.model('ItemDate');
const Item = mongoose.model('Item');
const Balance = mongoose.model('Balance');
const bodyParser = require('body-parser')

module.exports = (app) => {

////////////////////GET ITEMS////////////////////////////////////
  app.get('/api/date', async (req,res) =>{
    let itemDate = await ItemDate.find().sort('-date');
    return res.status(200).send(itemDate);
  })

////////////////////ADD ITEM////////////////////////////////////
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
      //create a new date with that item if it doesn't exist
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
    latestBalance.balance = newBalanceAmount;
    latestBalance.save();

    return res.status(200).send(item);
  })

////////////////////EDIT ITEM////////////////////////////////////
  app.post('/api/date/edit', async (req,res) => {
    let itemID = req.body.id;
    let itemName = req.body.itemName;
    let itemAmount = req.body.itemAmount;
    let originalAmount = req.body.originalAmount;
    let itemDate = new Date(req.body.itemDate);
    let originalDate = new Date(req.body.originalDate);

    let oDate = await ItemDate.findOne({date:originalDate});
    const currentItem = oDate.items.id(itemID);

    //if the date didn't change just update the item
    if(itemDate.getTime() === originalDate.getTime()){
      currentItem.name = itemName;
      currentItem.amount = itemAmount;
      currentItem.amount = itemAmount;
      oDate.save(err => {
        if(!err)
          console.log("successful")
      });
    } else {
      let newDate = await ItemDate.findOne({date:itemDate});
      if(newDate){
        newDate.items.push(currentItem);
        newDate.save();
      } else{
        const createdDate = new ItemDate({
          date: itemDate,
          items: [currentItem]
        });
        createdDate.save();
      }

      //If this is the last item left for this date delete date
      if(oDate.items.length===1){
        oDate.remove();
      } else{
      //Remove Item from this Date
        currentItem.remove();
      }
    }

    //Update Balance if different from original
    if(originalAmount!=itemAmount){
      let latestBalance = await Balance.findOne().sort('-updateDate');
      const difference = originalAmount-itemAmount;
      const newBalanceAmount = latestBalance.balance+difference;
      latestBalance.balance = newBalanceAmount;
      latestBalance.save();
    }

    oDate.save();
    res.end();
  })

////////////////////DELETE ITEM//////////////////////////////////
  app.post('/api/date/delete', async (req,res) => {
    const itemID = req.body.id;
    const itemDate = req.body.date;
    let latestBalance = await Balance.findOne().sort('-updateDate');

    await ItemDate.findOne({date:itemDate}, (err,date) => {
      if(date){
        const currentItem = date.items.id(itemID);

        //Update Balance
        const newBalanceAmount = latestBalance.balance+currentItem.amount;
        latestBalance.balance = newBalanceAmount;
        latestBalance.save();

        //If there's no more items delete date
        if(date.items.length===1){
          date.remove();
        } else{
        //Remove Item from this Date
          currentItem.remove();
        }

        date.save();
      }
    });
    return res.status(200).send("successful");
  })
}
