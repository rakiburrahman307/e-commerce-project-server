const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const authService = require("../service/auth.service");
const sendResponse = require("../utils/sendResponce");
const { default: status } = require("http-status");
const config = require("../config/config");

// Login User
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req?.body);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successful",
    data: {
      accessToken,
    },
  });
});

// Register User
const registerNewUser = catchAsync(async (req, res) => {
  const result = await authService.registeredUser(req?.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User is created successful",
    data: result,
  });
});



// LogOut User
const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = req?.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  registerNewUser,
  logoutUser,
  getUserProfile,
};
