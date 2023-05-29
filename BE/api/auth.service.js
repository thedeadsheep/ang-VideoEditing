const { verify, decode } = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7)
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid token'
                    })
                }
                if (decoded.email == req.query.email) {
                    next();
                } else {
                    return res.status(401).json({
                        message: 'You are not authorized to access with wrong email'
                    });
                }
            })
        } else {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
    }
}