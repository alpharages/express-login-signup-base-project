const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers['access-token'];

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, function (err, tokenData) {

                if (err) {
                    res.status(401).json({error: true, message: 'Token is incorrect.'});
                } else {
                    next();
                }

            });
        } else {
            res.status(401).json({error: true, message: 'No token found: Access denied.'});
        }

    } catch (exception) {
        res.status(400).json({error: true, message: exception.message});
    }

};
