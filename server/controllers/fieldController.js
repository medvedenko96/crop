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

const getFields = ({ query }, res) => {
  const { id: regionId } = query;

  if (!regionId) {
    return responseJSON(res, 400, { message: 'All fields required.' });
  }

  return pool.query('SELECT id, field_name as name FROM field WHERE region_id=$1', [regionId], (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }
    const fields = (!!result && result.rows) || [];

    return responseJSON(res, 200, { fields, isSuccess: true });
  });
};

const deleteField = ({ query }, res) => {
  const { id: fieldId } = query;

  if (!fieldId) {
    return responseJSON(res, 400, { message: 'All fields required.' });
  }

  return pool.query('DELETE FROM field WHERE id=$1', [fieldId], (error, result) => {
    if (error) {
      return responseJSON(res, 500, { message: 'Server error', error });
    }

    const { rowCount } = result;

    if (rowCount) {
      return responseJSON(res, 200, { isSuccess: true });
    }

    return responseJSON(res, 200, { isSuccess: false });
  });
};

const updateField = ({ body }, res) => {
  const { fieldId, fieldName, regionId } = body;

  if (!fieldId || !fieldName || !regionId) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query(
    'SELECT * FROM field WHERE field_name=$1 AND region_id=$2',
    [fieldName, regionId],
    (error, result) => {
      if (error) {
        return responseJSON(res, 500, { message: 'Server error', error });
      }

      const { rowCount } = result;

      if (!!rowCount) {
        return responseJSON(res, 200, { isSuccess: false, message: 'Field exists' });
      }

      return pool.query('UPDATE field SET field_name=$1 WHERE id=$2', [fieldName, fieldId], (error, result) => {
        if (error) {
          return responseJSON(res, 500, { message: 'Server error', error });
        }

        const { rowCount } = result;

        if (rowCount) {
          return responseJSON(res, 200, {
            isSuccess: true,
            message: 'Field updated',
          });
        }

        return responseJSON(res, 200, {
          isSuccess: false,
          message: 'Field not updated',
        });
      });
    },
  );
};

module.exports = {
  getFields,
  createField,
  deleteField,
  updateField,
};
