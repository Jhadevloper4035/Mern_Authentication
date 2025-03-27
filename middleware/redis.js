<<<<<<< HEAD
const client = require("../config/redis.js");
=======
const {client} = require("../config/redis.js");
>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)

const setOtp = async (email, otp) => {
  try {
    const response = await client.set(email, otp, "EX", 300);
    return response;
  } catch (error) {
    console.error("Error in setting otp", error);
    return null;
  }
};

const verifyOtp = async (email, enterdOtp) => {
  try {
    const savedOtp = await client.get(email);
    return savedOtp === enterdOtp;
  } catch (error) {
    console.error("Error in setting otp", error);
    return null;
  }
};

module.exports = { setOtp, verifyOtp };
