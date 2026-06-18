const express = require("express");
const router = express.Router();
console.log("Products routes loaded");
const {
  addProduct,
  getProducts,
  deleteProduct,
  getProductById
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProduct);
router.delete("/:id",deleteProduct);
router.get("/:id",getProductById);
module.exports = router;
