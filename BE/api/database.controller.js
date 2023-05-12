const {
    createUser,
    updatePassword
} = require('./database.service')
const { mailer } = require('./mail.service')

module.exports = {
    userRegister: (req, res) => {
        const body = req.body
        createUser(body, (err, result) => {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(400).json({
                        success: 0,
                        message: "Email already exists"
                    })
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            return res.status(200).json({
                success: 1,
            })
        })
    },
    getPassword: (req, res) => {
        var email = req.body.email

        //Create OTP
        const OTP = Math.floor(100000 + Math.random() * 900000)

        updatePassword({ password: OTP, email: email }, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            var kq = mailer(email, OTP)
            console.log(kq)
            return res.status(200).json({
                success: 1,
                message: `check email`
            })
        })
    },
    login: (req, res) => {

    }
}