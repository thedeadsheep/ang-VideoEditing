const { verify, decode } = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization')
        if (token) {
            token = token.slice(7)
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    if (Date.now() >= err.expiredAt) {
                        return res.status(498).json({
                            message: 'Token Expired'
                        })
                    }
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
    },
    checkTokenExpired: (req, res) => {
        let token = req.get('authorization')
        var tokenExpired = false
        if (token) {
            token = token.slice(7)
            verify(token, process.env.SECRET_KEY, (err, decoded) => {
                var { exp } = decode(token)
                console.log(exp.expiredAt)
                if (Date.now() >= exp * 1000) {
                    tokenExpired = true
                }
            })
        }
        if (tokenExpired) {
            return res.status(401).json({
                message: true
            })
        }
        return res.status(200).json({
            message: false
        })
    }
}