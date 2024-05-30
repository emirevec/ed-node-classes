const nodemailer = require("nodemailer")
const dotenv = require('dotenv')
dotenv.config()

const GMAIL_PASS = process.env.GMAIL_PASS

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "vecchioemiliano@gmail.com",
    pass: GMAIL_PASS,
  },
});

async function sendWelcomeMail(name, email) {
  const info = await transporter.sendMail({
    from: 'MVC App',
    to: `${email}`,
    subject: "Welcome to MVC App",
    text: "Welcome",
    html: `<b>Welcome ${name} to MVC App !</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}

//sendWelcomeMail().catch(console.error);

module.exports = sendWelcomeMail
