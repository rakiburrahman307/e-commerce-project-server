const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const {
  userAuthRouter,
  productRouter,
  reviewRouter,
  cartRouter,
  wishListRouter,
} = require("./routes");
const router = require("./routes");

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);
app.use(cookieParser());
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

module.exports = app;
