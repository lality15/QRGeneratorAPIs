const express = require("express");
const Store = require("../models/Store");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE STORE + MENU
router.post("/create", auth, async (req, res) => {
  try {
    const {
      ownerName,
      mobile,
      storeName,
      businessType,
      foodType,
      menu
    } = req.body;

    if (!storeName || !mobile || !menu?.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const slug = storeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const store = new Store({
      ownerName,
      mobile,
      storeName,
      slug,
      businessType,
      foodType,
      menu,
      menuUrl: `/menu/${slug}`
    });

    await store.save();

    res.json({
      _id: store._id,
      slug: store.slug,
      menuUrl: store.menuUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
