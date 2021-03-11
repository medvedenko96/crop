const { pool } = require('../db');
const { responseJSON } = require('../utils/response');

const createRegion = ({ body }, res) => {
  const { companyId, regionName } = body;

  if (!companyId || !regionName) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  return pool.query(
    'INSERT INTO manager (company_id, region_name) SELECT $1, $2 WHERE NOT EXISTS (SELECT id FROM manager WHERE id=$3)',
    [companyId, regionName, companyId],
    (error, result) => {
      if (error) {
        return res.status(500).send({ message: 'Server error', error });
      }

      const { rowCount } = result;

      if (rowCount) {
        return res.status(201).send({ message: 'Region added' });
      }

      return res.status(300).send({ message: 'Region exists' });
    },
  );
};

module.exports = {
  createRegion,
};
