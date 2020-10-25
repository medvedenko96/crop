const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const keys = require('./config/keys')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
    .connect(
    keys.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => console.log('mongodb connected...'), console.error('connect to mongodb has been failed...'))


require('./middleware/passport');
app.use('/', routes);

app.listen(PORT);
