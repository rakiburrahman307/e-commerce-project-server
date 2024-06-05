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
      
      // Remove the item from the WishList
      await WishList.findByIdAndDelete(_id);
      
      // Respond with a success message
      res.status(200).json({ message: "Item move to cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const getWishListItem = async(req, res) => {
    const userId = req?.params?.id;
    try {
         const wishList = await WishList.find({userId});
         res.status(200).send(wishList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  };
module.exports = {
  getWishListItem,
  addWishListToCart
};
