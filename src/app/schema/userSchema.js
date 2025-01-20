const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/config");

// userSchema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
      enum: ["superAdmin", "buyer", "vendor", "admin"],
      default: "buyer",
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Hashing the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(
    this.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});
// send response without send password
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// check user exist or not exist
userSchema.statics.isUserExistByEmail = async function (email) {
  return await User.findOne({ email }).select("+password");
};

// check user password matches or not
userSchema.statics.isPasswordMatch = async function (
  textPassword,
  hashPassword
) {
  return await bcrypt.compare(textPassword, hashPassword);
};

// check password issues date before change password
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp,
  jwtIssuedTimestamp
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
