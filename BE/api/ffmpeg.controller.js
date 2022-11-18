
const {
    trimVideo,
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
    renderVideo: (req, res) => {
        var renderReq = req.body
        var sId = renderReq.sessionID
        var files = renderReq.videoProcess
        var cutTimes = files.length
        for (var i = 0; i < cutTimes; i++) {
            trimVideo(files[i], sId, (err, result) => {
                if (err) {
                    console.log("err trim video")
                }
                console.log(result)

            })
        }
    }
}