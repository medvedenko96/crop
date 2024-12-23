const express = require('express');

const managerController = require('../controllers/managerController');
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');
const regionController = require('../controllers/regionController');
const fieldController = require('../controllers/fieldController');
const yearController = require('../controllers/yearController');
const zonalManagementController = require('../controllers/zonalManagementController');
const normBotController = require('../controllers/normBotController');
const filesController = require('../controllers/filesController');

const router = express.Router();

// manager
router.post('/manager', managerController.createManager);
router.post('/delete-manager', managerController.deleteManger);

// auth
router.post('/login-manger', authController.mangerLogin);
router.post('/login-company', authController.companyLogin);
router.get('/user-info', authController.getUserInfoByJWT);

// company
router.post('/create-company', companyController.createCompany);
router.post('/update-company', companyController.updateCompany);
router.post('/update-company-password', companyController.updateCompanyPassword);
router.get('/companies', companyController.getCompanies);
router.delete('/company', companyController.deleteCompany);
router.get('/company', companyController.getCompany);

// region
router.post('/create-region', regionController.createRegion);
router.post('/update-region', regionController.updateRegion);
router.get('/regions', regionController.getRegions);
router.get('/regions-with-fields', regionController.getRegionsWithFields);
router.delete('/region', regionController.deleteRegion);
router.get('/region', regionController.getRegion);

// field
router.post('/create-field', fieldController.createField);
router.post('/update-field', fieldController.updateField);
router.get('/fields', fieldController.getFields);
router.delete('/field', fieldController.deleteField);

// year
router.post('/year', yearController.createYear);
router.get('/years', yearController.getYears);
router.delete('/year', yearController.deleteYear);
router.post('/img-yield', yearController.setImgYield);
router.post('/img-control-area', yearController.setImgControlArea);
router.post('/description', yearController.setDescription);

// zonalManagement
router.post('/zonal-management', zonalManagementController.setZonalManagement);
router.get('/zonal-management', zonalManagementController.getZonalManagement);

// normBot
router.post('/norm-bot', normBotController.setNormBotRow);
router.get('/norm-bot', normBotController.getNormBot);
router.delete('/norm-bot', normBotController.deleteNormBotRow);

// files
router.post('/file', filesController.createFile);
router.post('/upd-file', filesController.updateFile);
router.get('/files', filesController.getFiles);
router.delete('/file', filesController.deleteFiles);

module.exports = router;
