const mongoose = require('mongoose');
const Date = mongoose.model('Date');

module.exports = (app) => {
  app.get('/api/date/:user', async (req,res) =>{
    const {user} = req.params;
    console.log(user);
    let itemDate = await Date.find().sort('-date');
    console.log(itemDate);
    return res.status(200).send(itemDate);
  })
}
