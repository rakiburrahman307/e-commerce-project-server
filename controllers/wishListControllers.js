const { WishList, Cart } = require("../models");
const addWishListToCart = async (req, res) => {
  const cartData = req?.body;
  const { _id } = cartData;
  try {
    // Create a new cart item
    const cart = new Cart({
      ...cartData,
    });
    // Save the cart item
    await cart.save();

    await WishList.findByIdAndDelete(_id);
    res.status(200).json({ message: "Item move to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getWishListItem = async (req, res) => {
  const userId = req?.params?.id;
  try {
    const wishList = await WishList.find({ userId });
    res.status(200).send(wishList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteItemFromWishList = async (req, res) => {
  const id = req?.params?.id;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const wishList = await WishList.findOneAndDelete({ _id: id });

    if (!wishList) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    res.status(200).send({message: "Item deleted successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getWishListItem,
  addWishListToCart,
  deleteItemFromWishList
};
