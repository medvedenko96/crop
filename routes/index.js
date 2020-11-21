const express = require('express');

const router = express.Router();
const authService = require('../services/authService');

// AdminLogin
router.post('/AdminLogin', authService.login);
router.post('/create-user', authService.createUser);
router.get('/logout', authService.logout);

router.get('/test', (req, res) => {
  res.send(req.session);
});

module.exports = router;
