require("dotenv").config();
const { client } = require("../config/twilio.config.js");

const sendOtp = async (phoneNumber, OTP) => {
  try {
    const message = await client.messages.create({
      body: `Your verification OTP is ${OTP}. Please enter this code to verify your mobile number.
🔒    Do not share this code with anyone. It is valid for only 10 minutes.
      If you didn’t request this, please ignore this message.`,
      from: "+15416232686",
      to: phoneNumber,
    });
    return message.sid;
  } catch (error) {
    return null
  }
};

module.exports = { sendOtp };
