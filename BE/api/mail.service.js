var nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
const {
    updateSection,
} = require('./database.service')
dotenv.config()
module.exports = {
    uploadToCloud: async (filePath, email, sId) => {
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
                updateSection({ video_link: kq.url, email: email, videoSection: sId }, (error, result) => {
                    if (error) console.log(error)
                    console.log(result)
                })
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
    mailer: (reciveEmail, content, title) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: `VideoRender <noreply.${process.env.EMAIL}>`,
            to: reciveEmail,
            subject: title,
            text: `${content}`,
            replyTo: `noreply.${process.env.EMAIL}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return false
            }
            console.log('Email sent: ' + info.response);
        });

        return true
    }
}