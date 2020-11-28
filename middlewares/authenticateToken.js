const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports.authenticateToken = (path = []) => (req, res, next) => {
  const { url, cookies } = req;

  if (path.includes(url)) {
    next();
    return;
  }

  if (cookies.token) {
    jwt.verify(cookies.token, keys.jwt_secret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).send({ error: 'You most login!' });
  }
};
