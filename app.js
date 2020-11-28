const express = require('express');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./middlewares/authenticateToken');

const app = express();
const PORT = process.env.PORT || 8000;

const path = ['/login'];

require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authenticateToken(path), require('./routes'));

app.listen(PORT);
