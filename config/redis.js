const { Redis } = require("ioredis");
<<<<<<< HEAD


const client = new Redis();


module.exports = client
=======
const { Queue } = require("bullmq");

const client = new Redis({ maxRetriesPerRequest: null });

const emailOtpQueue = new Queue("email-Otp-Queue", {
  connection: client,
});

const welcomeEmailQueue = new Queue("welcome-emial-queue", {
  connection: client,
});

module.exports = { client, emailOtpQueue  , welcomeEmailQueue };
>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)
