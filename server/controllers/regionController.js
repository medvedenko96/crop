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
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    const { rowCount, rows } = result;

    if (rowCount) {
      return responseJSON(res, 200, { message: 'Region added', isSuccess: true, newRegion: rows[0] });
    }

    return responseJSON(res, 200, { message: 'Region exists', isSuccess: false });
  });
};

const getRegionsByCompanyId = ({ body }, res) => {
  const { companyId } = body;

  if (!companyId) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query('SELECT id, region_name as name FROM region WHERE company_id=$1', [companyId], (error, result) => {
    if (error) {
      return res.status(500).send({ message: 'Server error', error });
    }
    const regions = (!!result && result.rows) || [];

    return responseJSON(res, 200, { regions, isSuccess: true });
  });
};

module.exports = {
  createRegion,
  getRegionsByCompanyId,
};
