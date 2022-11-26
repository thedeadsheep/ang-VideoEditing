const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { default: ShortUniqueId } = require("short-unique-id")
module.exports = {

    trim: async (file, sId) => {
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        tempName = tempName + ".mp4"
        console.log(" inside service", file, sId)
        var fileInputName = "uploads\\" + sId + "\\" + file.fileName
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        var startPoint = file.start
        var endPoint = file.end

        async function lsExample() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -ss ${startPoint} -to ${endPoint} -i ${fileInputName} -c copy ${fileOutputName}`);

                console.log("done", file.fileName)
            } catch (e) {
                console.error(e); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await lsExample()
        return tempName
    },
    merge: async (fileNo1, fileNo2, sId) => {
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        var fileNameNo1 = "uploads\\" + sId + "\\" + fileNo1.editedName
        var fileNameNo2 = "uploads\\" + sId + "\\" + fileNo2.editedName
        tempName = tempName + ".mp4"
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        async function lsExample() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -i ${fileNameNo1} -i ${fileNameNo2} -filter_complex "[0]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v0];[1]scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,setsar=1[v1];[v0][0:a:0][v1][1:a:0]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" ${fileOutputName}`);

                console.log("done")
            } catch (e) {
                console.error("err"); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await lsExample()
        console.log("merge " + fileNo1.originName + " + " + fileNo2.originName + " = " + tempName)
        return {
            originName: fileNo1.editedName,
            editedName: tempName
        }
    },
    mergeVideo: (fileNo1, fileNo2, callBack) => {
        var fileOutputName = "OutputMerge" + fileNo1.uploadFileName + fileNo2.uploadFileName
        exec(`ffmpeg -y -i ${fileNo1.uploadFileName} -i ${fileNo2.uploadFileName} -filter_complex "[0]scale=720:576:force_original_aspect_ratio=decrease,pad=720:576:(ow-iw)/2:(oh-ih)/2,setsar=1[v0];[1]scale=720:576:force_original_aspect_ratio=decrease,pad=720:576:(ow-iw)/2:(oh-ih)/2,setsar=1[v1];[v0][0:a:0][v1][1:a:0]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" ${fileOutputName}`, (err, stdout, stderr) => {
            if (err) {
                console.log("err", err)
                return callBack(err)
            }
            if (stderr) {
                console.log("stderr: ", stderr)
                return callBack(stderr)
            }
            return callBack(null, fileOutputName)
        })
    },
    trimVideo: (file, sId, callBack) => {
        console.log(" inside service", file, sId)
        var fileInputName = "uploads\\" + sId + "\\" + file.fileName
        var fileOutputName = "uploads\\" + sId + "\\trim-" + file.fileName
        var startPoint = file.start
        var endPoint = file.end


        exec(`ffmpeg -y -ss ${startPoint} -to ${endPoint} -i ${fileInputName} -c copy ${fileOutputName}`, (err, stdout, stderr) => {
            if (err) {
                console.log("err", err)
                return callBack(err)
            }
            console.log("done")
            return callBack(null, fileOutputName)
        })
    },
}