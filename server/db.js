const { Pool } = require('pg');
const config = require('./config');

const connectionString = `postgresql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`;

const pool = new Pool({
	connectionString: config.IS_PRODUCTION ? config.DATABASE_URL : connectionString,
	ssl: config.IS_PRODUCTION ? { rejectUnauthorized: false } : false,
});

module.exports = {
	pool,
};
