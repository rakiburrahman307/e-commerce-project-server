const { Product } = require("../models");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        console.log(products)
        res.status(200).send(products);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
    }
};

module.exports={
    getProducts,
}