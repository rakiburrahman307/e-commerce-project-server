const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./app/routes");
const globalErrorHandler = require("./app/middleware/globalErrorHandler");
const notFound = require("./app/middleware/notFound");

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);
// /api/v1

// ------------------------------------------------------------------------------
//------------------------------- Routes ----------------------
//-------------------------------------------------------------------------------
// Authentication Routes
app.use("/api/v1", router);
// ------------------------------------------------------------------------------
//------------------------------- Routes Ends ----------------------
//-------------------------------------------------------------------------------

app.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the E-Commerce API",
  });
});
// global error handler
app.use(globalErrorHandler);
//Not Found
app.use(notFound);

module.exports = app;
