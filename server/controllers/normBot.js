const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { snakeToCamelMapper } = require('../utils/snakeToCamel');

const updateRowNormBot = (res, yearId, normBotRow) => {
	const {
		rowNumber = 0,
		controlNorm = 0,
		controlYield = 0,
		controlSquare = 0,
		experimentNorm = 0,
		experimentYield = 0,
		experimentSquare = 0,
		rowKey,
	} = normBotRow;

	const query = `UPDATE norm_bot SET
								year_id=$1, row_number=$2, control_norm=$3, control_yield=$4, control_square=$5,
                experiment_norm=$6, experiment_yield=$7, experiment_square=$8
								WHERE year_id=$9 AND row_key=$10`;

	return pool.query(
		query,
		[
			yearId,
			rowNumber,
			controlNorm,
			controlYield,
			controlSquare,
			experimentNorm,
			experimentYield,
			experimentSquare,
			yearId,
			rowKey,
		],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const { rowCount } = result;

			if (rowCount) {
				return responseJSON(res, 200, {
					isSuccess: true,
					message: 'save',
				});
			}

			return responseJSON(res, 200, { message: 'notSave' });
		}
	);
};

const createRowNormBot = (res, yearId, normBotRow) => {
	const {
		rowNumber = 0,
		controlNorm = 0,
		controlYield = 0,
		controlSquare = 0,
		experimentNorm = 0,
		experimentYield = 0,
		experimentSquare = 0,
		rowKey,
	} = normBotRow;

	const query = `INSERT INTO norm_bot
								(year_id, row_number, control_norm, control_yield, control_square,
								 experiment_norm, experiment_yield, experiment_square, row_key)
								SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9`;

	return pool.query(
		query,
		[
			yearId,
			rowNumber,
			controlNorm,
			controlYield,
			controlSquare,
			experimentNorm,
			experimentYield,
			experimentSquare,
			rowKey,
		],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const { rowCount } = result;

			if (rowCount) {
				return responseJSON(res, 200, {
					isSuccess: true,
					message: 'save',
				});
			}

			return responseJSON(res, 200, { message: 'notSave' });
		}
	);
};

const setNormBotRow = ({ body }, res) => {
	const { yearId, normBotRow } = body;

	if (!yearId || !normBotRow) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	const { rowKey } = normBotRow;

	return pool.query(
		'SELECT * FROM norm_bot WHERE year_id=$1 AND row_key=$2',
		[yearId, rowKey],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const { rowCount } = result;

			if (rowCount) {
				return updateRowNormBot(res, yearId, normBotRow);
			}

			return createRowNormBot(res, yearId, normBotRow);
		}
	);
};

const getNormBot = ({ query }, res) => {
	const { id: yearId } = query;

	if (!yearId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query(`SELECT * FROM norm_bot WHERE year_id=$1`, [yearId], (error, result) => {
		if (error) {
			return responseJSON(res, 500, { message: error.message, errorInfo: error });
		}

		const normBotRows = (!!result && result.rows) || [];

		return responseJSON(res, 200, {
			isSuccess: true,
			data: normBotRows.map((row) => snakeToCamelMapper(row)),
		});
	});
};

const deleteNormBotRow = ({ body }, res) => {
	const { id: yearId, row: rowKey } = body;

	if (!yearId || !rowKey) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query(
		`DELETE FROM norm_bot WHERE year_id=$1 AND row_key=$2`,
		[yearId, rowKey],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: error.message, errorInfo: error });
			}

			const { rowCount } = result;

			if (rowCount) {
				return responseJSON(res, 200, { isSuccess: true, message: 'normBot.delete' });
			}

			return responseJSON(res, 200, { message: 'normBot.notDelete' });
		}
	);
};

module.exports = {
	setNormBotRow,
	getNormBot,
	deleteNormBotRow,
};
