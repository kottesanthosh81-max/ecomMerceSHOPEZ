const Product = require("../models/Product");

exports.addProduct = async (req, res) => {

    const product = await Product.create(req.body);

    res.json(product);
};


exports.getProducts = async (req, res) => {

    const products = await Product.find();

    res.json(products);
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
