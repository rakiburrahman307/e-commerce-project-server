const { default: status } = require("http-status");
const AppError = require("../errors/AppError");
const config = require("../config/config");
const User = require("../schema/userSchema");
const createToken = require("../utils/createToken");

const loginUser = async (payload) => {
     // checking if the user is exist
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(status.FORBIDDEN, 'This user is blocked !');
  }
    //checking if the password is correct

    if (!(await User.isPasswordMatch(payload?.password, user?.password)))
        throw new AppError(status.FORBIDDEN, 'Password do not matched');
    const jwtPayload = {
        userId: user._id,
        role: user?.role,
      };
    
      const accessToken = createToken(
        jwtPayload,
        config.JWT_SECRET,
        config.JWT_ACCESS_EXPIRES_IN,
      );
    
      const refreshToken = createToken(
        jwtPayload,
        config.JWT_REFRESH_SECRET,
        config.JWT_REFRESH_EXPIRES_IN,
      );
    
      return {
        accessToken,
        refreshToken,
      };
};

const registeredUser = async (payload) => {
  const { email } = payload;
  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(status.CONFLICT, "This email already exists");
  }
  const result = await User.create(payload);
  return result;
};

const authService = {
  loginUser,
  registeredUser,
};
module.exports = authService;
