const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch(() => console.error('connect to mongodb has been failed'));

require('./manager');
