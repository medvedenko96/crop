const { pool } = require('../db');
const { responseJSON } = require('../utils/response');

const createField = ({ body }, res) => {
  const { regionId, fieldName } = body;

  if (!regionId || !fieldName) {
    return responseJSON(res, 400, { message: 'All fields required.' });
  }

  const query = `INSERT INTO field (region_id, field_name)
    SELECT $1, $2
    WHERE NOT EXISTS
        (SELECT field_name
        FROM field
        WHERE field_name=$3 AND region_id=$4) 
            RETURNING id, field_name AS name`;

  const value = [regionId, fieldName, fieldName, regionId];

  return pool.query(query, value, (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    const { rowCount, rows } = result;

    if (rowCount) {
      return responseJSON(res, 200, { message: 'Field added', isSuccess: true, newField: rows[0] });
    }

    return responseJSON(res, 200, { message: 'Field exists', isSuccess: false });
  });
};

const getFieldsByRegionId = ({ body }, res) => {
  const { regionId } = body;

  if (!regionId) {
    return responseJSON(res, 400, { message: 'All fields required.' });
  }

  return pool.query('SELECT id, field_name as name FROM field WHERE region_id=$1', [regionId], (error, result) => {
    if (error) {
      return res.status(500).send({ message: 'Server error', error });
    }
    const regions = (!!result && result.rows) || [];

    return responseJSON(res, 200, { regions, isSuccess: true });
  });
};

module.exports = {
  createField,
  getFieldsByRegionId,
};
