const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error('mongodb failed', err));

require('./manager');
require('./company');
