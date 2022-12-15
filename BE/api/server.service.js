const { default: ShortUniqueId } = require("short-unique-id")
const fs = require('fs')
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
    deleteCache: async () => {
        fs.readdirSync('./uploads/').forEach(file => {
            fs.stat('./uploads/' + file, async (err, stats) => {
                if (err) {
                    throw err
                }

                // print file last modified date
                console.log((new Date().getDate() - new Date(stats.mtime).getDate()))
                console.log(`File Status Last Modified: ${stats.ctime}`)
                async function deleteFolder(dFold) {
                    try {
                        const { stdout, stderr } = await exec(`rmdir uploads\\${dFold}`);

                    } catch (e) {
                        console.error(e);
                    }
                }
                var rmDate = Math.abs(new Date().getDate() - new Date(stats.mtime).getDate())
                if (rmDate == 7) {

                    await deleteFolder(file)
                }
            })
        });
        return true
    }

}