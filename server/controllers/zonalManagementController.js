const { pool } = require('../db');
const { responseJSON } = require('../utils/response');
const { snakeToCamelMapper } = require('../utils/snakeToCamel');

const zonalManagementIdByTypes = {
	A: 1,
	highLevelZoneCheck: 2,
	lowLevelZoneCheck: 3,
	B: 4,
	highLevelZoneCheckB: 5,
	lowLevelZoneCheckB: 6,
	C: 7,
	highLevelZoneCheckC: 8,
	lowLevelZoneCheckC: 9,
};

const zonalManagementTypesById = {
	1: 'A',
	2: 'highLevelZoneCheck',
	3: 'lowLevelZoneCheck',
	4: 'B',
	5: 'highLevelZoneCheckB',
	6: 'lowLevelZoneCheckB',
	7: 'C',
	8: 'highLevelZoneCheckC',
	9: 'lowLevelZoneCheckC',
};

const updateRowZonalManagement = (res, yearId, zonalManagementType, zonalManagementFields) => {
	const {
		yieldCapacity = 0,
		actualPopulation = 0,
		plantingDensity = 0,
		hectares = 0,
	} = zonalManagementFields;

	const query = `UPDATE zonal_management SET
								year_id=$1, type=$2, yield_capacity=$3, actual_population=$4, planting_density=$5, hectares=$6
								WHERE year_id=$7 AND type=$8`;

	return pool.query(
		query,
		[
			yearId,
			zonalManagementIdByTypes[zonalManagementType],
			yieldCapacity,
			actualPopulation,
			plantingDensity,
			hectares,
			yearId,
			zonalManagementIdByTypes[zonalManagementType],
		],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: 'serverError', error });
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

const createRowZonalManagement = (res, yearId, zonalManagementType, zonalManagementFields) => {
	const {
		yieldCapacity = 0,
		actualPopulation = 0,
		plantingDensity = 0,
		hectares = 0,
	} = zonalManagementFields;

	const query = `INSERT INTO zonal_management
								(year_id, type, yield_capacity, actual_population, planting_density, hectares)
								SELECT $1, $2, $3, $4, $5, $6`;

	return pool.query(
		query,
		[
			yearId,
			zonalManagementIdByTypes[zonalManagementType],
			yieldCapacity,
			actualPopulation,
			plantingDensity,
			hectares,
		],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: 'serverError', error });
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

const setZonalManagement = ({ body }, res) => {
	const { yearId, zonalManagementType, zonalManagementFields } = body;

	if (!yearId || !zonalManagementType) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query(
		'SELECT * FROM zonal_management WHERE year_id=$1 AND type=$2',
		[yearId, zonalManagementIdByTypes[zonalManagementType]],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: 'serverError', error });
			}

			const { rowCount } = result;

			if (rowCount) {
				return updateRowZonalManagement(
					res,
					yearId,
					zonalManagementType,
					zonalManagementFields
				);
			}

			return createRowZonalManagement(
				res,
				yearId,
				zonalManagementType,
				zonalManagementFields
			);
		}
	);
};

const getZonalManagement = ({ query }, res) => {
	const { id: yearId } = query;

	if (!yearId) {
		return responseJSON(res, 400, { message: 'All fields required.' });
	}

	return pool.query(
		`SELECT type, yield_capacity, actual_population, planting_density, hectares
 			FROM zonal_management WHERE year_id=$1`,
		[yearId],
		(error, result) => {
			if (error) {
				return responseJSON(res, 500, { message: 'serverError', error });
			}

			const zonalManagementRows = (!!result && result.rows) || [];

			return responseJSON(res, 200, {
				isSuccess: true,
				data: zonalManagementRows.map((row) => ({
					...snakeToCamelMapper(row),
					type: zonalManagementTypesById[row.type],
				})),
			});
		}
	);
};

module.exports = {
	setZonalManagement,
	getZonalManagement,
};
