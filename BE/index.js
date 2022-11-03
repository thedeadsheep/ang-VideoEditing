const { upload, trimVideo, multiUpload } = require("./api/ffmpeg.controller")

const express = require('express')


const cors = require('cors')

const bodyparser = require('body-parser')

const path = require('path')

const multer = require('multer')

const app = express()

app.use(express.static(path.join(__dirname + "/uploads")))



app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors())

app.post('/file', upload)

app.post('/trim', trimVideo)

app.post('/multiple', (req, res) => {

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/bac");
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

    let responseData = []

    req.files.forEach(file => {
      var data = {
        originalname: file.originalname,
        serverFilename: file.filename,
        serverPath: file.path,
        type: file.minetype,
        size: file.size,
        uploaded: true
      }
      responseData.push(data)
    });

    res.json({
      data: responseData
    })

  })
})

app.listen(3000, () => {
  console.log("App is listening on port 3000")
})