const express = require('express');

const router = express.Router();
const authService = require('../services/authService');
const managerService = require('../services/managerService');

// auth
router.post('/login', authService.login);
router.get('/logout', authService.logout);

// manager
router.post('/create-manager', managerService.createManager);

router.get('/test', (req, res) => {
  res.send({ session: req.session, headers: req.headers, cookies: req.cookies });
});

module.exports = router;
