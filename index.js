const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const { dbConnection } = require("./config/dbConnection");
const { userAuthRouter } = require("./routes");

// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true,
}));
app.use(cookieParser());

// ------------------------------------------------------------------------------
//-------------------------------All Authentication Routes ----------------------
//-------------------------------------------------------------------------------
// Authentication Routes
app.use("/auth", userAuthRouter);

// ------------------------------------------------------------------------------
//-------------------------------All Authentication Routes Ends ----------------------
//-------------------------------------------------------------------------------

app.listen(port, async () => {
  console.log(`Server is listening on port :${port}`);
  // the database Connection Call the function
  await dbConnection();
});
app.get("/", async (req, res) => {
  res.send("e-commerce server is running......");
});

