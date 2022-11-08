
const {
    trimVideo,
    mergeVideo
} = require("./ffmpeg-function.service")
const path = require('path')

module.exports = {

    trimVideo: (req, res) => {
        var file
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
        })
    }
}