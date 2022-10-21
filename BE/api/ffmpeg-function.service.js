const { exec } = require("child_process")
module.exports = {
    trimVideo: (file, callBack) => {
        var fileInputName = file.uploadFileName
        var fileOutputName = "Output" + fileInputName
        var startPoint = file.start
        var endPoint = file.end
        exec(`ffmpeg -y -ss ${startPoint} -to ${endPoint} -i ${fileInputName} -c copy ${fileOutputName}`, (err, stdout, stderr) => {
            if (err) {
                console.log("err", err)
                return callBack(err)
            }
            if (stderr) {
                console.log("stderr: ", stderr)
                return callBack(err)
            }
            return callBack(null, fileOutputName)
        })
    },
    mergeVideo: (fileNo1, fileNo2, callBack) => {
        var fileOutputName = "OutputMerge" + fileNo1.uploadFileName + fileNo2.uploadFileName
        exec(`ffmpeg -i ${fileNo1.uploadFileName} -i ${fileNo2.uploadFileName} -filter_complex "[0]scale=720:576:force_original_aspect_ratio=decrease,pad=720:576:(ow-iw)/2:(oh-ih)/2,setsar=1[v0];[1]scale=720:576:force_original_aspect_ratio=decrease,pad=720:576:(ow-iw)/2:(oh-ih)/2,setsar=1[v1];[v0][0:a:0][v1][1:a:0]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" ${fileOutputName}`, (err, stdout, stderr) => {
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
    }
}