const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { authenticateToken } = require('./middlewares/authenticateToken');

const isProduction = process.env.NODE_ENV === 'production';

const origin = {
	origin: isProduction ? process.env.DOMEN : '*',
};

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(cors(origin));

app.use('/api', authenticateToken, require('./routes'));

if (isProduction) {
	const dirname = __dirname.replace('/server', '');
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT);
