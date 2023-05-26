const {
    createUser,
    updateColumn,
    getPassword,
    getValue,
    deleteVideoData
} = require('./database.service')

const host = 'http://localhost:3000/'
const { sign, verify } = require('jsonwebtoken');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { mailer } = require('./mail.service')

module.exports = {
    userRegister: (req, res) => {
        const body = req.body
        const email = body.email
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
            const token = sign({ email: email }, 'confirmEmail', { expiresIn: '12h' })
            updateColumn({ column: `confirmEmail`, changeValue: token, email: email },
                (error, result) => {
                    if (error)
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        })
                    mailer(email, `${host}confirmUser?email=${email}&token=${token}`, `ConfirmEmail`)
                    return res.status(200).json({
                        success: 1,
                        message: `check your email to confirm`
                    })
                })

        })
    },
    getPassword: (req, res) => {
        var email = req.body.email

        //Create OTP
        const OTP = Math.floor(100000 + Math.random() * 900000)
        const salt = genSaltSync(10)

        const cryptOTP = hashSync(OTP.toString(), salt)
        console.log(cryptOTP)
        getValue({ column: 'confirmEmail', email: email }, (error, result) => {
            console.log(result)
            if (error) {
                return res.status(500).json({
                    success: 0,
                    message: "Something went wrong"
                })
            }
            if (!result) {
                return res.status(200).json({
                    success: 0,
                    message: "YourEmail not confirmed"
                })
            }
            updateColumn({ column: `otp`, changeValue: cryptOTP, email: email }, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                var kq = mailer(email, OTP, `YourPassword`)
                console.log(kq)
                return res.status(200).json({
                    success: 1,
                    message: `check email`
                })
            })

        })

    },
    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password
        getPassword(email, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User not found"
                })
            }
            if (!compareSync(password, results.OTP)) {
                return res.status(404).json({
                    success: 0,
                    message: "Wrong password"
                })
            }
            const token = sign({ email: email }, 'denvau', { expiresIn: '3h' })
            return res.status(200).json({
                success: 1,
                message: "Login success",
                token: token,
                displayName: results.nickname
            })
        })
    },
    confirmUser: (req, res) => {
        const tokenQuery = req.query.token;;
        var email
        try {
            const decoded = verify(tokenQuery, `confirmEmail`)
            email = decoded.email
        } catch (err) {
            return res.status(400).json({
                success: 0,
                message: "Invalid token"
            })
        }
        updateColumn({ column: 'confirmEmail', email: email, changeValue: 'done' },
            (error, result) => {

                console.log("inUpdatecol")
                if (error) {


                    console.log("error")
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }

                console.log("done")
                return res.status(200).json({
                    success: 1,
                    message: "email confirmed"
                })
            })
    },
    deleteVideoById: (req, res) => {
        const body = req.query.video_id
        console.log(body)

        deleteVideoData({ video_id: body },
            (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "Delete Done"
                })
            })
    }
}