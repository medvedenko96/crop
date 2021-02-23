const express = require('express');

const managerController = require('../controllers/managerController');
const authController = require('../controllers/authController');

const router = express.Router();

// MANAGER
router.post('/create-manager', managerController.createManager);
router.post('/delete-manager', managerController.deleteManger);
// auth
router.post('/login-manger', authController.MangerLogin);

// COMPANY

module.exports = router;
