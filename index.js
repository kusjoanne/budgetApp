require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import your models
require('./models/Product');
require('./models/Balance');
require('./models/Item');
require('./models/date');

const app = express();
const db_name = "budgetAppDB";
const db_pw = process.env.DB_PW;
const db_url = "mongodb+srv://admin-joanne:"+db_pw+"@cluster0-9ruej.mongodb.net/"+db_name+"?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`, { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || db_url, { useNewUrlParser: true });

app.use(bodyParser.json());

//import the balanceRoutes
require('./routes/productRoutes')(app);
require('./routes/balanceRoutes')(app);
require('./routes/itemRoutes')(app);
require('./routes/dateRoutes')(app);

//make the app production ready
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

//https://dev.to/pacheco/my-fullstack-setup-node-js-react-js-and-mongodb-2a4k
