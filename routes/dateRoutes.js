const mongoose = require('mongoose');
const Date = mongoose.model('Date');

module.exports = (app) => {
  app.get('/api/date', async (req,res) =>{
    // const {user} = req.params;
    let itemDate = await Date.find().sort('-date');
    return res.status(200).send(itemDate);
  })

  // app.post('/api/date', async (req, res) => {
  //   let itemDate = await Date.create(req.body);
  //   return res.status(201).send({
  //     error: false,
  //     product
  //   })
  // })
}
