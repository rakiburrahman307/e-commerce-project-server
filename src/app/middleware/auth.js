const jwt = require("jsonwebtoken");
const { status } = require("http-status");
const { User } = require("../models");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../errors/AppError");
const config = require("../config/config");

const auth = async (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    // Extract token from request cookies
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
    // checking if the token is missing
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(status.NOT_FOUND, "This user is not found!");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = decoded;
    next();
  });
};

module.exports = auth;
// try {
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   // Verify token
//   const decoded = jwt.verify(token, JWT_SECRET);
//   const user = await User.findById(decoded.userId);
//   if (!user) {
//     return res.status(401).json({ error: "Unauthorized - Invalid token" });
//   }

//   req.user = user;
//   next();
// } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: "Internal server error" });
// }
