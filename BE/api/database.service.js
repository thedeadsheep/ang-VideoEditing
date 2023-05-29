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
                    return callBack(error)
                }
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
    },
    newSection: (data, callBack) => {
        pool.query(
            `Insert into project_data (email, video_id, project_name, video_status, video_link)
                values(?, ?, ?, ?, ?)`,
            [
                data.email,
                data.videoSection,
                data.projectName,
                false,
                null
            ],
            (error, result, field) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, result)
            }
        )
    },
    updateSection: (data, callBack) => {
        pool.query(
            `UPDATE project_data SET video_status = ?, video_link = ? 
            where (email = ? and video_id = ?)`,
            [
                true,
                data.video_link,
                data.email,
                data.videoSection
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        )
    },
    getVideoData: (data, callBack) => {
        pool.query(
            `SELECT video_id, project_name, video_status, video_link FROM project_data WHERE email = ?`,
            [
                data
            ],
            (error, results, field) => {
                if (error) return callBack(error)
                return callBack(null, results)
            }
        )
    },
    deleteVideoData: (data, callBack) => {
        pool.query(
            `DELETE FROM project_data WHERE video_id = ? and email = ?`,
            [
                data.video_id,
                data.email
            ],
            (error, result, field) => {
                if (error) return callBack(error)
                return callBack(null, result)
            }
        )
    }

}