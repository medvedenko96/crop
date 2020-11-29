const express = require('express');

const router = express.Router();
const authServices = require('../services/authServices');
const managerServices = require('../services/managerServices');
const companyServices = require('../services/companyServices');

// auth
router.get('/logout', authServices.logout);
router.post('/login', authServices.login);

// manager
router.post('/create-manager', managerServices.createManager);

// company
router.get('/get-companies', companyServices.getCompanies);
router.post('/create-company', companyServices.createCompany);

router.get('/test', (req, res) => {
  res.send({ session: req.session, headers: req.headers, cookies: req.cookies });
});

module.exports = router;
