const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
require('./models');
require('./middleware/passport');

const routes = require('./routes');

app.use('/', routes);
app.listen(PORT);
