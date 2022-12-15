
const {
    trimVideo, trim, merge, speedUpVideo
} = require("./ffmpeg-function.service")
const path = require('path')

module.exports = {

    renderVideo: async (req, res) => {
        var renderReq = req.body
        console.log(renderReq)
        var sId = renderReq.sessionID
        var files = renderReq.videoProcess
        var frameRatio = renderReq.videoRatio
        console.log(frameRatio)
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

        var finalFile = trimedVideo[0]

        if (trimedVideo.length > 1) {
            var respoMergeFile = await merge(trimedVideo[0], trimedVideo[1], sId, frameRatio)
            finalFile = respoMergeFile;
            for (var i = 2; i < cutTimes; i++) {

                respoMergeFile = await merge(finalFile, trimedVideo[i], sId, frameRatio)
                finalFile = respoMergeFile
            }
        }

        console.log("out of merge")
        if (renderReq.speedup) {
            finalFile = await speedUpVideo(finalFile, sId)
        }
        sendFile = "uploads\\" + sId + "\\" + finalFile.editedName
        res.download(sendFile)
    },
    downloadVideo: (req, res) => {
        var renderReq = req.body
        var sId = renderReq.sessionID
    }

}