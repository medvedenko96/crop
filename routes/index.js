const express = require('express');

const managerController = require('../controllers/managerController');

const router = express.Router();

// manager
router.post('/create-manager', managerController.createManager);

router.get('/test', managerController.getAllManagers);

module.exports = router;
