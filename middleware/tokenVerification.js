const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model.js");

const setAuthToken = async (user, res) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000 * 24 * 7, // Corrected: 3600000 ms = 1 hour
    });
    
    return token;
  } catch (error) {
    console.error("Error in setting auth token", error);
    return null
  }
};

const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized : No token provided " });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return res.status(401).json({ message: "Unauthorized : user Not found  " });
  }

  req.user = user;

  next();
};

const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized : user Not have admin access " });
  }
  next();
};

module.exports = { isAdmin, isLoggedIn, setAuthToken };
