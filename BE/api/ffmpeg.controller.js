
const {
    trimVideo, trim, merge
} = require("./ffmpeg-function.service")
const path = require('path')

module.exports = {

    trimVideo: (req, res) => {
        /*var file
        trimVideo(file, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "err"
                })
            }
            console.log(result)
            res.status(200).send({
                data: "done"
            })
        })*/
    },
    renderVideo: async (req, res) => {
        var renderReq = req.body
        var sId = renderReq.sessionID
        var files = renderReq.videoProcess
        var cutTimes = files.length
        var trimedVideo = []
        for (var i = 0; i < cutTimes; i++) {
            var trimOutName = await trim(files[i], sId)
            trimedVideo.push({
                originName: files[i].fileName,
                editedName: trimOutName
            })
        }
        console.log(trimedVideo)
        var finalFile;
        var respoMergeFile = await merge(trimedVideo[0], trimedVideo[1], sId)
        finalFile = respoMergeFile;
        for (var i = 2; i < cutTimes; i++) {

            respoMergeFile = await merge(finalFile, trimedVideo[i], sId)
            finalFile = respoMergeFile
        }
        console.log("out of merge")
        sendFile = "uploads\\" + sId + "\\" + finalFile.editedName
        res.download(sendFile)
    }

}