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
// filter product
const filteredProducts = async (req, res) => {
  try {
    const { categories, color, size, brand, price, priceRange, rating } =
      req.body;

    // Validate filters
    if (
      !Array.isArray(categories) ||
      !Array.isArray(color) ||
      !Array.isArray(size) ||
      !Array.isArray(brand) ||
      !Array.isArray(rating) ||
      (price && typeof price !== "string") ||
      !Array.isArray(priceRange) ||
      priceRange.length !== 2 ||
      priceRange.some(isNaN)
    ) {
      return res.status(400).json({ error: "Invalid filter format" });
    }

    // Build query based on provided filters
    const query = {};

    if (categories.length) {
      query.category = { $in: categories };
    }
    if (color.length) {
      query.color = { $in: color };
    }
    if (size.length) {
      query.size = { $in: size };
    }
    if (brand.length) {
      query.brand = { $in: brand };
    }
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      }
    }
    if (priceRange[0] >= 0 && priceRange[1] >= 0) {
      query.price = { $gte: priceRange[0], $lte: priceRange[1] };
    }
    if (rating.length) {
      query.rating = {
        $in: rating
          .map(Number)
          .filter((num) => !isNaN(num) && num >= 1 && num <= 5),
      };
    }

    // Log the query for debugging
    console.log("Query:", query);

    // Fetch filtered products from database
    const products = await Product.find(query);

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
