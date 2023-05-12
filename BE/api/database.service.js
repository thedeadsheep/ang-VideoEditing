const pool = require("../config/database")

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `INSERT INTO users (email, nickname) 
                values(?, ?)`,
            [
                data.email,
                data.nickname
            ],
            (error, result, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, result)
            }
        )
    },
    updatePassword: (data, callBack) => {
        console.log(data)
        pool.query(
            `UPDATE users SET otp = ? where email = ?`,
            [
                data.password,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    }

}