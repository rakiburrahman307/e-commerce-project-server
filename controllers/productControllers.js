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
const filteredProducts = async (req, res) => {
  try {
    const { categories, color, size, brand, minPrice, maxPrice, rating } = req.body;
    // Input Validation
    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
      return res.status(400).json({ error: "Invalid minPrice format" });
    }
    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
      return res.status(400).json({ error: "Invalid maxPrice format" });
    }
    if (rating && (isNaN(rating) || rating < 0 || rating > 5)) {
      return res.status(400).json({ error: "Invalid rating format" });
    }
    // Input Validation close
    const query = {};

    if (categories) {
      query.category = { $in: categories.split(",") };
    }
    if (color) {
      query.color = color;
    }
    if (size) {
      query.size = { $in: size.split(",") };
    }
    if (brand) {
      query.brand = brand;
    }

    if (minPrice && maxPrice) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    const products = await Product.find(query).lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getProducts,
  getSingleProduct,
  relatedProduct,
  filteredProducts,
};
