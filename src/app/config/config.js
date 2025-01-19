const path = require("path");
require("dotenv").config({ path: path.join((process.cwd(), ".env"))});



module.exports ={
    PORT: process.env.PORT,
    USER_DB: process.env.USER_DB,
    USER_PASS: process.env.USER_PASS,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URL: process.env.MONGODB_URL
}
