require('dotenv').config();

module.exports = {
	JWT_SECRET: process.env.JWT_SECRET,
	NODE_ENV: process.env.NODE_ENV,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_DATABASE: process.env.DB_DATABASE,
	DATABASE_URL: process.env.DATABASE_URL,
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
