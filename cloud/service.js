var nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    mailSender: (email, content) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: `CAi gif do <noreply.${process.env.EMAIL}>`,
            to: email,
            subject: 'Sending Email using Node.js',
            text: content,
            replyTo: `noreply.${process.env.EMAIL}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return `Mail Da gui`
    }
}