const { Cart } = require("../models");
// add product to cart
const addCartProduct = async (req, res) => {
  const product = req?.body;

  // Validate input
  if (!product || !product?.userId) {
    return res.status(400).send({ error: { message: "Invalid product data" } });
  }

  try {
    const { _id } = product;
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
    if (error?.code === 11000) {
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
// get all product form cart
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
//  delete products from cart
const deleteCartProduct = async (req, res) => {
  const id = req?.params?.id;
  if (!id) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  try {
    const deletedProduct = await Cart.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).send({ message: "Product successfully deleted!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 // increase product quantity
const increaseCartQuantity = async (req, res) => {
    const id = req?.params?.id;
    try {
        const cartProduct = await Cart.findById(id);
        if (!cartProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (cartProduct.quantity >= 20) {
            return res.status(400).json({ error: "Quantity cannot exceed 20" });
        }
        cartProduct.quantity += 1;
        await cartProduct.save();
        res.status(200).send({ message: "Quantity increased!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
 // decrease product quantity
const decreaseCartQuantity = async (req, res) => {
    const id = req?.params?.id;
    try {
        const cartProduct = await Cart.findById(id);
        if (!cartProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        if (cartProduct.quantity <= 1) {
            return res.status(400).json({ error: "Quantity cannot be less than 1" });
        }
        cartProduct.quantity -= 1;
        await cartProduct.save();
        res.status(200).send({ message: "Quantity Decreased!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const resetCartQuantity = async (req, res) => {
    const id = req?.params?.id;
    try {
        const cartProduct = await Cart.findById(id);
        if (!cartProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        cartProduct.quantity = 1;
        await cartProduct.save();
        res.status(200).send({ message: "Quantity reset!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
  addCartProduct,
  getCartProducts,
  deleteCartProduct,
  increaseCartQuantity,
  decreaseCartQuantity,
  resetCartQuantity
};
