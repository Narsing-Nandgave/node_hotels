const mongoose = require("mongoose");
// Define the menu schema

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["Spicy", "Sweet", "Sour", "Salty", "Bitter"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
    required: true,
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("Menu", menuItemSchema);
module.exports = MenuItem;
// This schema defines a menu item with fields for name, price, taste, whether it's a drink, ingredients, and number of sales.
