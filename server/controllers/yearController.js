const { pool } = require('../db');
const { responseJSON } = require('../utils/response');

const createYear = ({ body }, res) => {
	const { fieldId, year, crop } = body;

	if (!fieldId || !year || !crop) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	const query = `INSERT INTO year_field (field_id, year_field, crop)
    SELECT $1, $2, $3 WHERE NOT EXISTS
        (SELECT id FROM year_field WHERE year_field=$4 AND field_id=$5) 
        RETURNING id, year_field AS year, crop`;

	const value = [fieldId, year, crop, year, fieldId];

	return pool.query(query, value, (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount, rows } = result;

		if (rowCount) {
			return responseJSON(res, 200, {
				message: 'year.added',
				isSuccess: true,
				newYear: rows[0],
			});
		}

		return responseJSON(res, 200, { message: 'year.exists' });
	});
};

const getYears = ({ query }, res) => {
	const { id: fieldId } = query;

	if (!fieldId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query(
		'SELECT id, year_field AS year, crop FROM year_field WHERE field_id=$1',
		[fieldId],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const years = (!!result && result.rows) || [];

			return responseJSON(res, 200, { years, isSuccess: true });
		}
	);
};

const deleteYear = ({ query }, res) => {
	const { id: yearId } = query;

	if (!yearId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query('DELETE FROM year_field WHERE id=$1', [yearId], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const { rowCount } = result;

		if (rowCount) {
			return responseJSON(res, 200, { isSuccess: true, message: 'year.delete' });
		}

		return responseJSON(res, 200, { message: 'year.notDelete' });
	});
};

module.exports = {
	createYear,
	getYears,
	deleteYear,
};
