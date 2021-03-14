const express = require('express');

const managerController = require('../controllers/managerController');
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');
const regionController = require('../controllers/regionController');

const router = express.Router();

// manager
router.get('/get-manager-by-jwt', managerController.getManagerByJWT);
router.post('/create-manager', managerController.createManager);
router.post('/delete-manager', managerController.deleteManger);

// auth
router.post('/login-manger', authController.MangerLogin);

// company
router.post('/create-company', companyController.createCompany);
router.get('/get-companies', companyController.getCompanies);
router.post('/delete-company', companyController.deleteCompany);

// region
router.post('/create-region', regionController.createRegion);
router.post('/get-company-regions', regionController.getRegionsByCompanyId);

module.exports = router;
