const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../middleware/tokenVerification.js");
const {
  sendOtpToEmail,
  resgister,
  login,
  sendOtpToMobile,
  loginUsingMobile,
  forgotPasswordSendMail,
  forgotPasswordVerifyMail,
  getAllUser,
} = require("../controllers/auth.js");

//Login using email
router.post("/email/send-otp", sendOtpToEmail);
router.post("/email/register", resgister);
router.post("/email-password/login", login);
router.post("/email-forgot/send-otp", forgotPasswordSendMail);
router.post("/email-forgot/verify-otp", forgotPasswordVerifyMail);


//Login using mobile number
router.post("/sms/send-otp", sendOtpToMobile);
router.post("/sms/login", loginUsingMobile);
router.get("/allusers", isLoggedIn, isAdmin, getAllUser);

module.exports = router;
