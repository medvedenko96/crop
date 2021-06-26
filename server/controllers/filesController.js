const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { snakeToCamelMapper } = require('../utils/snakeToCamel');

const createFile = ({ body }, res) => {
	const { yearId, fileName, fileUrl } = body;

	if (!yearId || !fileName || !fileUrl) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	const query = `INSERT INTO files (year_id, file_name, file_url)
    SELECT $1, $2, $3 RETURNING id, year_id, file_url, file_name`;

	const value = [yearId, fileName, fileUrl];

	return pool.query(query, value, (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount, rows } = result;

		if (rowCount) {
			return responseJSON(res, 200, {
				message: 'file.added',
				isSuccess: true,
				newFile: snakeToCamelMapper(rows[0]),
			});
		}

		return responseJSON(res, 200, { message: 'file.error' });
	});
};

const getFiles = ({ query }, res) => {
	const { id: yearFieldId } = query;

	if (!yearFieldId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('SELECT * FROM files WHERE year_id=$1', [yearFieldId], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const files = (!!result && result.rows) || [];

		return responseJSON(res, 200, {
			files: files.map((year) => snakeToCamelMapper(year)),
			isSuccess: true,
		});
	});
};

const deleteFiles = ({ query }, res) => {
	const { id: fileId } = query;

	if (!fileId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('DELETE FROM files WHERE id=$1', [fileId], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount } = result;

		if (rowCount) {
			return responseJSON(res, 200, { isSuccess: true, message: 'file.delete' });
		}

		return responseJSON(res, 200, { message: 'file.notDelete' });
	});
};

const updateFile = ({ body }, res) => {
	const { fileName, fileUrl, fileId } = body;

	if (!fileId || !fileName || !fileUrl) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('SELECT * FROM files WHERE id=$1', [fileId], (error, result) => {
		if (error) {
			console.log(error);
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount } = result;

		if (!rowCount) {
			return responseJSON(res, 200, { isSuccess: false, message: 'file.notUpdate' });
		}

		return pool.query(
			'UPDATE files SET file_url=$1, file_name=$2 WHERE id=$3',
			[fileUrl, fileName, fileId],
			(error, result) => {
				if (error) {
					return responseJSON(res, 500, { message: error.message, errorInfo: error });
				}

				const { rowCount } = result;

				if (rowCount) {
					return responseJSON(res, 200, {
						isSuccess: true,
						message: 'field.updated',
					});
				}

				return responseJSON(res, 200, {
					isSuccess: false,
					message: 'file.notUpdate',
				});
			}
		);
	});
};

module.exports = {
	createFile,
	getFiles,
	deleteFiles,
	updateFile,
};
