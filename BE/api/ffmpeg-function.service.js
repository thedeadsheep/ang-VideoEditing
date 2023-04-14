const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { default: ShortUniqueId } = require("short-unique-id")
module.exports = {

    trim: async (file, sId, extensionName) => {
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()

        tempName = tempName + "." + extensionName
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
    merge: async (fileNo1, fileNo2, sId, frame, extensionName) => {
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        var fileNameNo1 = "uploads\\" + sId + "\\" + fileNo1.editedName
        var fileNameNo2 = "uploads\\" + sId + "\\" + fileNo2.editedName
        var frameRatio = frame
        console.log(frame)
        console.log(frame == 'landscape')
        tempName = tempName + "." + extensionName
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        async function lsExample() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -i ${fileNameNo1} -i ${fileNameNo2} -filter_complex "[0]scale=${frameRatio}:force_original_aspect_ratio=decrease,pad=${frameRatio}:(ow-iw)/2:(oh-ih)/2,setsar=1[v0];[1]scale=${frameRatio}:force_original_aspect_ratio=decrease,pad=${frameRatio}:(ow-iw)/2:(oh-ih)/2,setsar=1[v1];[v0][0:a:0][v1][1:a:0]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" ${fileOutputName}`);

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
    changeFrameSingleVideo: async (file, sId, frame, extensionName) => {
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        tempName = tempName + "." + extensionName
        console.log(" inside speedup", file, sId)
        var fileInputName = "uploads\\" + sId + "\\" + file.editedName
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        var frameRatio = frame
        async function changeRatio() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -i ${fileInputName} -vf "scale=${frameRatio}:force_original_aspect_ratio=decrease,pad=${frameRatio}:-1:-1:color=black" ${fileOutputName}`);

                console.log("done", file.editedName)
            } catch (e) {
                console.error(e); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await changeRatio();
        return {
            originName: file.editedName,
            editedName: tempName
        }
    },
    speedUpVideo: async (file, sId, extensionName) => {
        console.log(file)
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        tempName = tempName + "." + extensionName
        console.log(" inside speedup", file, sId)
        var fileInputName = "uploads\\" + sId + "\\" + file.editedName
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        async function speedup() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -i ${fileInputName} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" ${fileOutputName}`);

                console.log("done", file.editedName)
            } catch (e) {
                console.error(e); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await speedup();
        return {
            originName: file.editedName,
            editedName: tempName
        }
    },
    addColorFilter: async (file, sId, extensionName, filterData) => {
        console.log(file)
        const temp = new ShortUniqueId({ length: 12 })
        var tempName = await temp()
        tempName = tempName + "." + extensionName
        console.log(" inside re-color", file, sId)
        var fileInputName = "uploads\\" + sId + "\\" + file.editedName
        var fileOutputName = "uploads\\" + sId + "\\" + tempName
        async function addLut() {
            try {
                const { stdout, stderr } = await exec(`ffmpeg -y -i ${fileInputName} -vf hue=h=${filterData.hue}:s=${filterData.saturate}:b=${filterData.brightness} ${fileOutputName}`);

                console.log("done", file.editedName)
            } catch (e) {
                console.error(e); // should contain code (exit code) and signal (that caused the termination).
            }
        }
        await addLut();
        return {
            originName: file.editedName,
            editedName: tempName
        }
    }
}