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
    getValue: (data, callBack) => {
        pool.query(
            `select ${data.column} from users where email = ?`,
            [
                data.email
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error)
                }
                if (result[0].confirmEmail != `done`) {
                    return callBack(false)
                }
                return callBack(null, result[0].confirmEmail)
            }
        )
    },
    updateColumn: (data, callBack) => {

        pool.query(
            `UPDATE users SET ${data.column} = ? where email = ?`,
            [
                data.changeValue,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    console.log(error)
                    return callBack(error)
                }
                console.log(results)
                return callBack(null, results[0])
            }
        )
    },
    getPassword: (data, callBack) => {
        pool.query(
            `SELECT OTP, nickname FROM users WHERE email = ?`,
            [
                data
            ],
            (error, results, field) => {
                if (error) return callBack(error)
                return callBack(null, results[0])
            }
        )
    }

}