const { transporter } = require("../config/email.config.js");
const { Verification_Email_Template, Welcome_Email_Template,} = require("../templates/emailTemplate.js");

const sendVerficationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: "<navrojjha21@gmail.com>", // sender address
      to: email, // list of receivers
      subject: "Verify your Email ", // Subject line
      text: "Verify your Email ", // plain text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });
    return response
  } catch (error) {
    console.error(error);
    return null
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: "<navrojjha21@gmail.com>", // sender address
      to: email, 
      subject: "Welcome to Our Community!", // Subject line
      text: "Welcome to Our Community!", // plain text body
      html: Welcome_Email_Template.replace("{name}", name), // html body
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendVerficationCode, sendWelcomeEmail };
