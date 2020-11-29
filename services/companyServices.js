const mongoose = require('mongoose');
const { responseJSON } = require('../utils/response');

const Company = mongoose.model('companies');

const createCompany = ({ body: { companyName, password } }, res) => {
  if (!companyName || !password) {
    return responseJSON(res, 400, { error: 'All fields required.' });
  }

  Company.findOne({ companyName }).then((existingCompany) => {
    if (existingCompany) {
      responseJSON(res, 400, { error: 'Existing manager' });
    } else {
      const newCompany = new Company({ companyName, isAdmin: true });

      newCompany.setPassword(password);
      newCompany.save((err) => {
        if (err) {
          return responseJSON(res, 404, err);
        }

        return responseJSON(res, 200, { error: 'Success' });
      });
    }
  });
};

const getCompanies = async (req, res) => {
  Company.find((err, document) => {
    if (err) {
      throw new Error();
    }

    const companies = document.map(({ companyName, _id }) => ({ companyName, id: _id }));

    return responseJSON(res, 200, companies);
  });
};

module.exports = { createCompany, getCompanies };
