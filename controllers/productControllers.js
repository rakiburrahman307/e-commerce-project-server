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
    const { categories, color, size, brand, minPrice, maxPrice, rating, sort } =
      req.body;
    const finalRating = parseFloat(rating?.split(",")[0]);
    // Input Validation
    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
      return res.status(400).json({ error: "Invalid minPrice format" });
    }
    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
      return res.status(400).json({ error: "Invalid maxPrice format" });
    }
    if (
      finalRating &&
      (isNaN(finalRating) || finalRating < 0 || finalRating > 5)
    ) {
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

    if (minPrice > 2 && maxPrice > 2) {
      query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice > 2) {
      query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice > 2) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    if (finalRating) {
      query.rating = { $gte: finalRating };
    }

    // Sorting logic
    let sortCriteria = {};
    switch (sort) {
      case "price_high_to_low":
        sortCriteria.price = -1;
        break;
      case "price_low_to_high":
        sortCriteria.price = 1;
        break;
      case "a_to_z":
        sortCriteria.title = 1;
        break;
      case "z_to_a":
        sortCriteria.title = -1;
        break;
      case "best_rating":
        sortCriteria.rating = -1;
        break;
      case "newest":
        sortCriteria.createdAt = -1;
        break;
      default:
        sortCriteria = {};
    }

    const products = await Product.find(query).sort(sortCriteria).lean();
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
