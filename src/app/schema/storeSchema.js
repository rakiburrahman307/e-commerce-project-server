const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    storeDescription: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    storeLogo: {
      type: String,
      trim: true,
    },
    storeCoverPhoto: {
      type: String,
      trim: true,
    },
    storeAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    storeRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("stores", storeSchema);
module.exports = Store;
