const { default: mongoose } = require("mongoose");
const { Product } = require("../models");
const validator = require('validator');

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
  const id = req.params.id;

  try {
    let product;

    // Check if the id is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      // If not a valid ObjectId, assume it's a search query by name
      product = await Product.findOne({ name: new RegExp(id, 'i') });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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
    const {
      categories,
      color,
      size,
      brand,
      minPrice,
      maxPrice,
      rating,
      sort,
      page,
      limit = 9,
    } = req.body;
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

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const searchProductsQuery = async (req, res) => {
  const query = req?.query?.title;

  try {

    if (!query) {
      return res.status(400).json({ message: 'Invalid query parameter' });
    }

    const sanitizedQuery = validator.escape(query);

    const products = await Product.find({ title: new RegExp(sanitizedQuery, 'i') })
      .limit(50)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found matching the query' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
  getProducts,
  getSingleProduct,
  relatedProduct,
  filteredProducts,
  searchProductsQuery

};
