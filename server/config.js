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
	SECRET_KEY: process.env.SECRET_KEY,
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	BUCKETEER_AWS_ACCESS_KEY_ID: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
	BUCKETEER_AWS_REGION: process.env.BUCKETEER_AWS_REGION,
	BUCKETEER_AWS_SECRET_ACCESS_KEY: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
	BUCKETEER_BUCKET_NAME: process.env.BUCKETEER_BUCKET_NAME,
};
