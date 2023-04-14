const express = require('express')
const app = express()
const port = 3000
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

const { mailSender } = require('./service.js')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 2024 }
}))

app.get('/', (req, res) => {
    console.log(req)
    res.json({ message: 'Hello World!' })
})



app.post("/", async (req, res) => {
    const file = ""
    const result = await cloudinary.uploader
        .upload(file, {
            public_id: `${Date.now()}`,
            resource_type: `auto`,
            folder: `videos`
        }, (error, kq) => {
            if (error) throw new Error()

            mailSender(`caigido`, kq.url)
        })

    res.json(result.url)

});

app.listen(port, () => console.log(`This is the beginning of the Node File Upload App`))