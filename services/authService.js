const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

let responseJSON = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.login = function  (req, res) {
    if (!req.body.userName  || !req.body.password) {
        responseJSON(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
            console.error(err);
            responseJSON(res, 400, err);
            return;
        }

        if (user) {
            responseJSON(res, 200, {
                token: 1
            });
        } else {
            responseJSON(res, 401, info);
        }
    })(req, res);
};

module.exports.createUser = function ({ body: { userName, password } }, res) {
    if (!userName  || !password) {
        responseJSON(res, 400, {
            'message': "All fields required."
        });
        return;
    }

    let newUser = new User({ userName });
    newUser.setPassword(password);

    newUser.save((err) => {
        if (err) {
            responseJSON(res, 404, err);
            return;
        }

        responseJSON(res, 200, {token: newUser.generateJwt()});
    });
};