const nodemailer = require('nodemailer');
//config for mailing services
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "48d86eb0ddf1de",
      pass: "2048c5a7240056"
    }
});

module.exports = transporter;