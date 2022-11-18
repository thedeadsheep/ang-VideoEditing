const { default: ShortUniqueId } = require("short-unique-id")
const { exec } = require("child_process")
module.exports = {
    createSessionId: async () => {
        const uid = await new ShortUniqueId({ length: 10 })
        var sessionId = uid()
        await exec(`mkdir uploads\\${sessionId}`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return err
            }
            console.log(`created folder ${sessionId}`)
        })
        return sessionId
    },


}