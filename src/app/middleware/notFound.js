const { status } = require("http-status");

const notFound = (req, res, next) => {
  return res.status(status.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
};
module.exports = notFound;
