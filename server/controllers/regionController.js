const { pool } = require('../db');
const { responseJSON } = require('../utils/response');

const createRegion = ({ body }, res) => {
    const { companyId, regionName } = body;

    if (!companyId || !regionName) {
        return responseJSON(res, 400, { message: 'All fields required.' });
    }

    const query = `INSERT INTO region (company_id, region_name)
    SELECT $1, $2
    WHERE NOT EXISTS
        (SELECT region_name
        FROM region
        WHERE region_name=$3 AND company_id=$4) 
            RETURNING id, region_name AS name`;

    const value = [companyId, regionName, regionName, companyId];

    return pool.query(query, value, (error, result) => {
        if (error) {
            return responseJSON(res, 500, { message: 'serverError', error });
        }

        const { rowCount, rows } = result;

        if (rowCount) {
            return responseJSON(res, 200, {
                message: 'region.added',
                isSuccess: true,
                newRegion: rows[0]
            });
        }

        return responseJSON(res, 200, { message: 'region.exists' });
    });
};

const getRegions = ({ query }, res) => {
    const { id: companyId } = query;

    if (!companyId) {
        return responseJSON(res, 400, { message: 'All fields required.' });
    }

    return pool.query(
        'SELECT id, region_name as name FROM region WHERE company_id=$1',
        [companyId],
        (error, result) => {
            if (error) {
                return res.status(500).send({ message: 'serverError', error });
            }
            const regions = (!!result && result.rows) || [];

            return responseJSON(res, 200, { regions, isSuccess: true });
        }
    );
};

const deleteRegion = ({ query }, res) => {
    const { id: regionId } = query;

    if (!regionId) {
        return responseJSON(res, 400, { message: 'All fields required.' });
    }

    return pool.query('DELETE FROM region WHERE id=$1', [regionId], (error, result) => {
        if (error) {
            return responseJSON(res, 500, 'serverError');
        }

        const { rowCount } = result;

        if (rowCount) {
            return responseJSON(res, 200, { isSuccess: true, message: 'region.delete' });
        }

        return responseJSON(res, 200, { message: 'region.notDelete' });
    });
};

const updateRegion = ({ body }, res) => {
    const { regionId, regionName, companyId } = body;

    if (!regionId || !regionName || !companyId) {
        return responseJSON(res, 400, { message: 'All fields required.' });
    }

    return pool.query(
        'SELECT * FROM region WHERE region_name=$1 AND company_id=$2',
        [regionName, companyId],
        (error, result) => {
            if (error) {
                return responseJSON(res, 500, { message: 'serverError', error });
            }

            const { rowCount } = result;

            if (rowCount) {
                return responseJSON(res, 200, { message: 'region.exists' });
            }

            return pool.query(
                'UPDATE region SET region_name=$1 WHERE id=$2',
                [regionName, regionId],
                (error, result) => {
                    if (error) {
                        return responseJSON(res, 500, { message: 'serverError', error });
                    }

                    const { rowCount } = result;

                    if (rowCount) {
                        return responseJSON(res, 200, {
                            isSuccess: true,
                            message: 'region.updated'
                        });
                    }

                    return responseJSON(res, 200, {
                        message: 'region.notUpdated'
                    });
                }
            );
        }
    );
};

module.exports = {
    getRegions,
    createRegion,
    deleteRegion,
    updateRegion
};
