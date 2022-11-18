const { trimVideo, renderVideo } = require("./api/ffmpeg.controller")
const { createSessionId } = require("./api/server.service")
const express = require('express')


const cors = require('cors')

const bodyparser = require('body-parser')

const path = require('path')

const multer = require('multer')

const app = express()

app.use(express.static(path.join(__dirname + "/uploads")))

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(cors())

app.post('/trim', trimVideo)

app.post('/renderVideo', renderVideo);

app.post('/multiple/:sId', async (req, res) => {
  let sessionId = req.params.sId
  if (sessionId == "noneSID") {
    sessionId = await createSessionId()
  }
  var storage = await multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${sessionId}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    },
  });

  let multipleUpload = await multer({ storage: storage }).array('files')
  await multipleUpload(req, res, (err) => {
    if (err) {
      console.log("error from multer", err)
    }
    let serverResponse = []
    console.log(req.files)
    req.files.forEach(file => {
      var data = {
        originalname: file.originalname,
        serverFilename: file.filename,
        serverPath: file.path,
        type: file.minetype,
        size: file.size,
        sessionId: sessionId
      }
      serverResponse.push(data)
    });
    var data = {
      sessionId: sessionId,
      serverResponse: serverResponse,
    }
    res.json({
      data: data
    })
  })
})

app.listen(3000, () => {
  console.log("App is listening on port 3000")
})