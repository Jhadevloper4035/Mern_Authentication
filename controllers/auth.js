require("dotenv").config();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { sendVerficationCode, sendWelcomeEmail} = require("../middleware/email.js");
const { sendOtp } = require("../middleware/sms.js");
const { setAuthToken } = require("../middleware/tokenVerification.js");
const { setOtp, verifyOtp } = require("../middleware/redis.js");
<<<<<<< HEAD
=======
const {  emailOtpQueue } = require("../config/redis.js");

>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)



const sendOtpToEmail = async (req, res) => {
  try {
    const { email  } = req.body;

    if (!email) {
<<<<<<< HEAD
      return res.status(400).json({
        success: false,
        message: "email requierd for register ",
      });
=======
      return res.status(400).json({ success: false,  message: "email requierd for register " });
>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
<<<<<<< HEAD
      return res
        .status(400)
        .json({ success: false, message: "User already registerd " });
    }

    const verficationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const otpRespo = await setOtp(email, verficationcode); 
    const emailRespo = otpRespo && await sendVerficationCode(email, verficationcode);  

    if (!otpRespo || !emailRespo )
      return res.status(400).json({ message: "Error in sending mail " });
=======
      return res.status(400).json({ success: false, message: "User already registerd " });
    }

    const verificationCode = Math.floor( 100000 + Math.random() * 900000 ).toString();

    await emailOtpQueue.add("send-email-otp" , {email , verificationCode } ) 
>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)

    res.status(200).json({ success: true, message: "Email Send Successfully "});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "internal server error", error });
  }
};

<<<<<<< HEAD
=======


>>>>>>> 7366923 (feat: add worker queue for OTP email delivery)
const resgister = async (req, res) => {
  try {
    const { code, password , email , name } = req.body;

    // Check for missing fields
    if (!code || !password || !email || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields .",
      });
    }

    const verfiyEmailRespo = await verifyOtp(email , code)

    if(!verfiyEmailRespo) return res.status(400).json({message : "Invalid or expired otp "})

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await new User({ name , email , password : hashedPassword , isVerified : true  }).save();

    const token = await setAuthToken(user, res);
    if (token === null)
      return res.status(400).json({ message: "error in seeting auth token" });

    // Send welcome email
    sendWelcomeEmail(user.email, user.name);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error in verfiyEmail function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required for user login .",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found please procced for register ",
      });
    }

    const ispasswordMatch = await user.comparePassword(password);

    if (!ispasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credential " });
    }

    const userDetail = { name: user.name, email: user.email , role : user.role  };

    const token = await setAuthToken(userDetail, res);
    if (!token) return res.status(400).json({ message: "Error in seeting auth token" });

    res.status(200).json({
      success: true,
      message: "User Logged In successfully ",
      user: userDetail,
    });
  } catch (error) {
    console.error("Errror in loging User", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



const forgotPasswordSendMail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const verficationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.findOneAndUpdate(
      { email },
      { verficationCode: verficationcode },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const respo = sendVerficationCode(email, verficationcode);
    if (respo === null)
      return res.status(400).json({ message: "Error in sending mail " });

    return res.status(200).json({ message: "Email Send Sucessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
};

const forgotPasswordVerifyMail = async (req, res) => {
  try {
    const { code, password } = req.body;

    if (!code || !password)
      return res.status(400).json({ message: " Otp and password required " });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { verficationCode: code },
      { password: hashedPassword },
      { new: true }
    );

    if (!user)
      return res.status(400).json({ message: "Invalid or experid otp" });

    user.verficationCode = undefined;
    await user.save();

    return res.status(200).json({ message: "password sucessfully updated" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "internal server error", error });
  }
};





// Login using Mobile Number 

const  sendOtpToMobile = async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) return res.status(400).json({ sucess: false, message: "Phone Number is required " });

    const verficationcode = Math.floor( 100000 + Math.random() * 900000).toString();
    const otpRespo = await setOtp(number, verficationcode);
    const status = await sendOtp(number, verficationcode);
    console.log(status);

    if (!status) return res.status(400).json({ message: "Error in sending otp " });
    
    return res.status(200).json({ success: true, message: "Otp Send Successfully " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error", error });
  }
};


const loginUsingMobile = async (req, res) => {
  try {

    const { code, number } = req.body;
    if (!code) return res.status(400).json({ success: false, message: "Otp required  " });

    const veriyMobileRespo = await verifyOtp(number , code);
    if (!veriyMobileRespo) return res.status(400).json({ success: false, message: "Invalid or Expired otp " })

    const user = await User.findOne({ number });

    if (!user){
      user = await new User({number}).save();
    }
    
    const token = await setAuthToken(user, res);
    if (!token)
      return res.status(400).json({ message: "error in seeting auth token" });

    res.status(200).json({
      success: true,
      message: "User Logged In successfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "internal server error", error });
  }
};




const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users === null)
      return res.status(404).json({ message: "users not found " });

    res.status(200).json({ message: "All Users", users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  sendOtpToEmail,
  resgister,
  login,
  sendOtpToMobile,
  loginUsingMobile,
  forgotPasswordSendMail,
  forgotPasswordVerifyMail,
  getAllUser

};
