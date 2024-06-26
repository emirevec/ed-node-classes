/**
*
* @file sendEmial.js
* @description This service is responsible for sending emails using Nodemailer.
*/

const nodemailer = require("nodemailer")
const dotenv = require('dotenv')
dotenv.config()

const GMAIL_PASS = process.env.GMAIL_PASS

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: "somemail@gmail.com",
    pass: GMAIL_PASS,
  },
});

/**
 * Sends an email to the user.
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @returns {Promise<void>}
 * @throws Will throw an error if the email could not be sent.
 * @example
 * const { sendMail } = require('./services');
 * sendMail('John Doe', 'john.doe@example.com')
 *   .then(() => console.log('Email sent'))
 *   .catch(error => console.error('Error sending email', error));
 */
async function sendEmail(name, email) {
  try {
    const info = await transporter.sendMail({
      from: 'MVC App',
      to: `${email}`,
      subject: "Welcome to MVC App",
      text: "Welcome",
      html: `<b>Welcome ${name} to MVC App !</b>`,
    })
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: %s", error.message);
    throw error;
  }
}

module.exports = sendEmail
