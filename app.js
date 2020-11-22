const express = require('express');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./middleware/authenticateToken');

const app = express();
const PORT = process.env.PORT || 8000;

const path = ['/login'];

require('./models');

app.use(express.json());
app.use(cookieParser());

app.use('/api', authenticateToken(path), require('./routes'));

app.listen(PORT);
