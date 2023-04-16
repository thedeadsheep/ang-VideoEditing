var nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    uploadToCloud: async (filePath, email) => {
        const file = filePath
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        const result = await cloudinary.uploader
            .upload(file, {
                public_id: `${Date.now()}`,
                resource_type: `auto`,
                folder: `videos`
            }, (error, kq) => {
                if (error) throw new Error()

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                var mailOptions = {
                    from: `VideoRender <noreply.${process.env.EMAIL}>`,
                    to: email,
                    subject: 'YourVideoAreDone',
                    text: `Your video link here:${kq.url} /n
                    Videoediting`,
                    replyTo: `noreply.${process.env.EMAIL}`
                };
                console.log("mailOPtions", mailOptions)
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {

                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            })
        return `done`
    },
}