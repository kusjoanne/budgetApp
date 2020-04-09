const mongoose = require('mongoose');
const Balance= mongoose.model('Balance');

module.exports = (app) => {
  app.get('/api/balance', async (req, res) => {
    let balance= await Balance.findOne().sort('-updateDate');
    return res.status(200).send(balance);
  });

}
