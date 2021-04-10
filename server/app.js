const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const { authenticateToken } = require('./middlewares/authenticateToken');

const origin = {
	origin: config.IS_PRODUCTION ? process.env.DOMEN : '*',
};

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(cors(origin));

app.use('/api', authenticateToken, require('./routes'));

if (config.IS_PRODUCTION) {
	const dirname = __dirname.replace('/server', '');
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT);
