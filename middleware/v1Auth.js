require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.auth, process.env.JWT_TOKEN);
        return next();
    } catch (err) {
        console.log(err.name);
        if (err.name === 'TokenExpiredError') {
            return res.status(419).json({
                code: 41,
                messeage: 'Expired token...',
            });
        }
        return res.status(401).json({
            code: 401,
            message: 'Invalid token...',
        });
    }
}