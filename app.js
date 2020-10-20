const express = require('express');
const passport = require('passport');
const PORT = process.env.PORT || 8000;
const routes = require('./routes');
const app = express();

app.use(express.json());

require('./middleware/passport');

app.use('/', routes);

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

app.listen(PORT);
