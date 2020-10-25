const express = require('express'),
    router = express.Router();

const authService = require('../services/authService');

//auth
router.post('/login', authService.login);
router.post('/create-user', authService.createUser)

router.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

module.exports = router;