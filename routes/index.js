const express = require('express'),
    router = express.Router();

const authService = require('../services/authService');

//auth
router.post('/login', authService.login);

module.exports = router;