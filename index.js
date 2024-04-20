const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
const { dbConnection } = require('./config/dbConnection');
const { userAuthRouter } = require('./routes');



// middleware 
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// ------------------------------------------------------------------------------
//-------------------------------All Authentication Routes ----------------------
//-------------------------------------------------------------------------------
// Register a new user
app.use('/register', userAuthRouter);
// Login user
app.use('/login', userAuthRouter);
// Logout user
app.use('/logout', userAuthRouter);
// Get user profile
app.use('/user', userAuthRouter);

// ------------------------------------------------------------------------------
//-------------------------------All Authentication Routes Ends ----------------------
//-------------------------------------------------------------------------------

app.listen(port, async () => {
  console.log(`Server is listening on port :${port}`);
  // the database Connection Call the function
  await dbConnection();
});

