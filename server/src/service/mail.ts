export {};

const nodemailer = require("nodemailer")

const sendActivationMail = async(to:string, link:string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    }
  })

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Account activation on " + process.env.API_URL,
    text: "",
    html:
    `
    <div>
      <h1>To activate your account click the following link</h1>
      <a href="${link}">${link}</a>
    </div>
    `
  })
}

exports.sendActivationMail = sendActivationMail;