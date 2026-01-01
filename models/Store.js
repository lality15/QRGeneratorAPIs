const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  image: String
});

const storeSchema = new mongoose.Schema({
  ownerName: String,
  storeName: String,
  slug: String,
  mobile: String,
  businessType: String,
  foodType: String,
  menu: [menuSchema],
  menuUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Store", storeSchema);
