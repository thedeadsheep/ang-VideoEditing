const multer = require('multer')
const {
    trimVideo,
    mergeVideo
} = require("./ffmpeg-function.service")

module.exports = {
    upload: (req, res) => {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads");
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
            },
        });

        var upload = multer({ storage: storage }).single('file');
        upload(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(req.file.path)
            var returnData = {

            }
            res.json({
                path: returnData
            })
        })
    },
    multiUpload: (req, res) => {

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "uploads");
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
            },
        });

        var multipleUpload = multer({ storage: storage }).array('files')
        multipleUpload(req, res, (err) => {
            if (err) {
                console.log(err)
            }
            console.log(req.files)

            let img = []

            req.files.forEach(file => {
                img.push(file.filename)
            });

            res.json({
                path: img
            })

        })
    },
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