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
} = require("./app/routes");
const router = require("./app/routes");

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
app.use(global)
module.exports = app;
