const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,

  },

  productName: {
    type: String,
  },

  category: {
    type: String,
  },

  image: {
    type: String,
  },

  price: {
    type: Number,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Order", orderSchema);