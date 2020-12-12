const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./middlewares/authenticateToken');

const app = express();
const PORT = process.env.PORT || 8000;

require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authenticateToken, require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT);
