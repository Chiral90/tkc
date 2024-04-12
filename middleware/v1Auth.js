require('dotenv').config()
const jwt = require('jsonwebtoken');

exports.generateToken = (id, req, res, next) => {
    const payload = { "id": id }
    const secretKey = process.env.JWT_TOKEN;
    const token = jwt.sign(
        payload,
        secretKey,
        { expiresIn: "1h"}
    );
    return token
}

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        req.decoded = jwt.verify(token, process.env.JWT_TOKEN);
        return next();
    } catch (err) {
        console.log(err.name);
        console.log(err);
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