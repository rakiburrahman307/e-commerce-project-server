const mongoose = require("mongoose");
// userAuthSchema
const userAuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["superAdmin", "student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userAuthSchema;
