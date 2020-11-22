const express = require('express');

const router = express.Router();
const authService = require('../services/authService');
const userService = require('../services/userService');

// auth
router.post('/login', authService.login);
router.get('/logout', authService.logout);

// user
router.post('/create-user', userService.createUser);

router.get('/test', (req, res) => {
  res.send({ session: req.session, headers: req.headers, cookies: req.cookies });
});

module.exports = router;
