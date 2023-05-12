const { renderVideo } = require("./api/ffmpeg.controller")
const { createSessionId, deleteCache, } = require("./api/server.service")
const { userRegister, getPassword } = require('./api/database.controller')
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


app.post('/renderVideo', renderVideo);

app.get('/newUser', userRegister);
app.get('/getOTP', getPassword);

app.post('/multiple/:sId', async (req, res) => {
  let sessionId = req.params.sId
  if (sessionId == "noneSID") {
    sessionId = await createSessionId()
  }
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, `uploads/${sessionId}`)
    },
    filename: function (_req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    },
  });

  const multipleUpload = multer({ storage: storage }).array('files')
  multipleUpload(req, res, (err) => {
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
    })
    var data = {
      sessionId: sessionId,
      serverResponse: serverResponse,
    }
    setTimeout(() => {
      res.json({
        data: data
      })
    }, 500);

  })
})

//delete old video folder
setInterval(() => {
  var a = deleteCache()
}, 604800 * 1000)

app.listen(3000, () => {
  console.log("App is listening on port 3000")
})