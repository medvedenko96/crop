const passport = require('passport');

let responseJSON = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.login = function  (req, res) {
    if (!req.body.username  || !req.body.password) {
        responseJSON(res, 400, {
            "message": "All fields required."
        });
        return;
    }

    passport.authenticate('local', { session: false }, function (err, user, info) {
        if (err) {
            console.log(err);
            responseJSON(res, 400, err);
            return;
        }

        if (user) {
            responseJSON(res, 200, {
                "token": "token"
            });

        } else {
            responseJSON(res, 401, info);
        }
    })(req, res);
};