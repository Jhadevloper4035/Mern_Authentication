const { Worker } = require("bullmq");
const { setOtp } = require("./redis");
const { sendVerficationCode } = require("./email");
const { client } = require("../config/redis.js");

const workerEmail = new Worker(
  "email-Otp-Queue",
  async (job) => {
    const { email, verificationCode } = job.data;
    try {
      const otpRespo = await setOtp(email, verificationCode);
      if (!otpRespo) throw new Error("Error setting OTP");

      const emailRespo = await sendVerficationCode(email, verificationCode);
      if (!emailRespo) throw new Error("Error sending email");

      console.log(`OTP sent successfully to ${email} ${job.id}`);
    } catch (error) {
      console.error(`Failed to send OTP to ${email}:`, error);
    }
  },
  { connection: client }
);





module.exports = { workerEmail };
