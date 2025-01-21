const path = require("path");
require("dotenv").config({ path: path.join((process.cwd(), ".env"))});
module.exports ={
    PORT: process.env.PORT,
    USER_DB: process.env.USER_DB,
    USER_PASS: process.env.USER_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URL: process.env.MONGODB_URL,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV: process.env.NODE_ENV,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    
}
