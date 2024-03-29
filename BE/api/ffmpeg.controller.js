
const {
    trim, merge, speedUpVideo, changeFrameSingleVideo, addColorFilter
} = require("./ffmpeg-function.service")
const {
    newSection,
} = require('./database.service')
const { uploadToCloud } = require('./mail.service')
const path = require('path')

module.exports = {

    renderVideo: async (req, res) => {
        var renderReq = req.body
        console.log(renderReq)
        var email = renderReq.email
        var projectName = renderReq.projectName
        var sId = renderReq.sessionID
        var files = renderReq.videoProcess
        var frameRatio = renderReq.videoRatio.resolu
        var extensionName = renderReq.extensionName
        newSection({ email: email, videoSection: sId, projectName: projectName }, (error, results) => {
            if (error) { console.log(error) }
            console.log(results)
        })
        console.log(extensionName)

        var cutTimes = files.length
        var trimedVideo = []
        for (var i = 0; i < cutTimes; i++) {
            var trimOutName = await trim(files[i], sId, extensionName)
            trimedVideo.push({
                originName: files[i].fileName,
                editedName: trimOutName
            })
        }
        console.log(trimedVideo)

        var finalFile = trimedVideo[0]

        if (trimedVideo.length > 1) {
            var respoMergeFile = await merge(trimedVideo[0], trimedVideo[1], sId, frameRatio, extensionName)
            finalFile = respoMergeFile;
            for (var i = 2; i < cutTimes; i++) {

                respoMergeFile = await merge(finalFile, trimedVideo[i], sId, frameRatio, extensionName)
                finalFile = respoMergeFile
            }
        } else {
            finalFile = await changeFrameSingleVideo(finalFile, sId, frameRatio, extensionName)
        }

        console.log("out of merge")
        if (renderReq.speedup) {
            finalFile = await speedUpVideo(finalFile, sId, extensionName)
        }
        if (renderReq.filter) {
            finalFile = await addColorFilter(finalFile, sId, extensionName, renderReq.filter)
        }
        sendFile = "uploads\\" + sId + "\\" + finalFile.editedName
        if (renderReq.email) {
            var kqReturn = await uploadToCloud(sendFile, renderReq.email, sId)
            res.send({
                message: "Please Check Your Mail!"
            })
        }
        res.download(sendFile)
    },


}