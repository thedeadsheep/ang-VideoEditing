const { upload, trimVideo } = require("./api/ffmpeg.controller")

const express = require('express')


const cors = require('cors')

const bodyparser = require('body-parser')

const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname + "/uploads")))

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors())

app.post('/file', upload)

app.post('/trim', trimVideo)

app.listen(3000, () => {
  console.log("App is listening on port 3000")
})