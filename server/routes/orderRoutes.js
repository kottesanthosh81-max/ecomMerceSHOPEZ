const express = require("express");
const router = express.Router();

const {
  addOrder,
  getOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

router.get("/", getOrders);

router.post("/", addOrder);
router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;

