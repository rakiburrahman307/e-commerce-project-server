const mongoose = require("mongoose");

// productSchema
const dimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
});
// meta Schema
const metaSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
});
// generate sku functionality
// const generateRandomSKU = () => {
//   return "SKU-" + Math.random().toString(36).substr(2, 9).toUpperCase();
// };
// kye point Schema
const keyPointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  point: { type: String, required: true },
});

// product schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  tags: { type: [String], required: true },

  weight: { type: Number, required: true },
  dimensions: { type: dimensionsSchema },
  keyPoint: { type: [keyPointSchema], required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  returnPolicy: { type: String, required: true },
  meta: { type: metaSchema, required: true },
  minimumOrderQuantity: { type: Number },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = productSchema;