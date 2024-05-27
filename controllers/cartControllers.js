const { Cart } = require("../models");

const addCartProduct = async (req, res) => {
  const product = req?.body;

  // Validate input
  if (!product || !product?.userId) {
    return res.status(400).send({ error: { message: "Invalid product data" } });
  }

  try {
    const { _id } = product;
    console.log(_id);

    // Check if the product is already in the user's cart
    const existingCartProduct = await Cart.findOne({ _id });

    if (existingCartProduct) {
      return res
        .status(400)
        .send({ error: { message: "You have already added this product" } });
    }

    const cart = new Cart({ ...product });

    await cart.save();
    return res
      .status(200)
      .send({ success: { message: "Product added successfully" } });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).send({
        error: {
          message:
            "Duplicate key error: This product already exists in the cart.",
        },
      });
    } else {
      return res
        .status(500)
        .send({ error: { message: "Internal server error" } });
    }
  }
};

const getCartProducts = async (req, res) => {
    const userId = req?.params?.id;
    try {
      const cartProducts = await Cart.find({ userId });
      res.status(200).send(cartProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  
};
module.exports = {
  addCartProduct,
  getCartProducts
};
