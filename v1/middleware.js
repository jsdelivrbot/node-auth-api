"use strict";
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const {
    resPayload
} = require("./utils");
const {
    SUPER_SECRET
} = require("./configs");

module.exports.verifyToken = (req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token)
        // verifies secret and checks exp
        jwt.verify(token, SUPER_SECRET, function (err, decoded) {
            if (err)
                next({
                    success: false,
                    message: 'Failed to authenticate token. Please generate fresh token by login'
                });

            next();
        });
    else // if there is no token return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
};