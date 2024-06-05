const { Product } = require("../models");

const getProducts = async (req, res) => {
  try {
    // Extract skip and limit from query parameters
    const skip = parseInt(req?.query?.skip, 10) || 0;
    const limit = parseInt(req?.query?.limit, 10) || 10;
    // Fetch products with pagination
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    res.status(200).json({ products, totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: id };
    const product = await Product.findOne(query);
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const relatedProduct = async (req, res) => {
  try {
    const category = req?.params?.category;
    const products = await Product.find({ category: category });
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  relatedProduct,
};
