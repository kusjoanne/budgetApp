const mongoose = require('mongoose');
const ItemDate = mongoose.model('ItemDate');

module.exports = (app) => {

  app.get('/api/itemDate/:user', async (req,res) =>{
    const {user} = req.params;
    console.log(user)
    let itemDate = await ItemDate.find({username:user}).sort('-date');
    return res.status(200).send(itemDate);
  })
}
