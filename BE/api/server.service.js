const { default: ShortUniqueId } = require("short-unique-id")
const util = require('util');
const exec = util.promisify(require('child_process').exec);
module.exports = {
    createSessionId: async () => {
        const uid = new ShortUniqueId({ length: 10 })
        var sessionId = uid()
        console.log(sessionId, "7")
        async function createFolder() {
            try {
                const { stdout, stderr } = await exec(`mkdir uploads\\${sessionId}`);
                console.log('stdout:', stdout);
                console.log('stderr:', stderr);

            } catch (e) {
                console.error(e); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await createFolder()
        return sessionId
    },

}