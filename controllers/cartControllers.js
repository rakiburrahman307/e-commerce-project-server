const { Cart } = require("../models");

const addCartProduct = async (req, res) => {
 const product = req?.body;
    try {
        const {_id} = product;
        const existingCartProduct = await Cart.findById(_id)
        if (existingCartProduct) {
            return res
              .status(400)
              .send({ message: "You have already added this product" });
          }
          const cart = new Cart({
         ...product,
          });
          await cart.save();
          res.status(200).send({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    addCartProduct,
};