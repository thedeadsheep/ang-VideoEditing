const { default: ShortUniqueId } = require("short-unique-id")
const { exec } = require("child_process")
module.exports = {
    createSessionId: () => {
        const uid = new ShortUniqueId({ length: 10 })
        var sessionId = uid()
        exec(`mkdir uploads\\${sessionId}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return err
            }
            console.log(`created folder ${sessionId}`)

        })
        return sessionId
    },

}