const express = require('express');

const managerController = require('../controllers/managerController');
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');
const regionController = require('../controllers/regionController');
const fieldController = require('../controllers/fieldController');
const yearController = require('../controllers/yearController');
const zonalManagement = require('../controllers/zonalManagementController');

const router = express.Router();

// manager
router.get('/get-manager-by-jwt', managerController.getManagerByJWT);
router.post('/create-manager', managerController.createManager);
router.post('/delete-manager', managerController.deleteManger);

// auth
router.post('/login-manger', authController.MangerLogin);

// company
router.post('/create-company', companyController.createCompany);
router.post('/update-company', companyController.updateCompany);
router.post('/update-company-password', companyController.updateCompanyPassword);
router.get('/get-companies', companyController.getCompanies);
router.delete('/delete-company', companyController.deleteCompany);

// region
router.post('/create-region', regionController.createRegion);
router.get('/get-regions', regionController.getRegions);
router.delete('/delete-region', regionController.deleteRegion);
router.post('/update-region', regionController.updateRegion);

// field
router.post('/create-field', fieldController.createField);
router.get('/get-fields', fieldController.getFields);
router.delete('/delete-field', fieldController.deleteField);
router.post('/update-field', fieldController.updateField);

// year
router.post('/create-year', yearController.createYear);
router.get('/get-years', yearController.getYears);
router.delete('/delete-year', yearController.deleteYear);

// zonalManagement
router.post('/set-zonal-management', zonalManagement.setZonalManagement);
router.get('/get-zonal-management', zonalManagement.getZonalManagement);

module.exports = router;
