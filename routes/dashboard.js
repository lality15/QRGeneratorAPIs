const express = require("express");
const Store = require("../models/Store");
const auth = require("../middleware/authMiddleware");
const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs")

const router = express.Router();

router.get("/stats", auth, async (req, res) => {
  try {
    const totalStores = await Store.countDocuments();
    res.json({ totalStores });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new QR in store 

router.post("/store/:id/qr", auth, async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    const menuUrl = `https://yourproductiondomain.com/menu/${store.slug}`;
    const qrPath = `uploads/qr/${store.slug}.png`;

    await QRCode.toFile(qrPath, menuUrl);

    store.menuUrl = menuUrl;
    store.qrCode = qrPath;
    await store.save();

    res.json({ qrCode: qrPath, menuUrl });
  } catch (err) {
    res.status(500).json({ message: "QR generation failed" });
  }
});

// 🔥 NEW: get all stores
router.get("/stores", auth, async (req, res) => {
  try {
    const stores = await Store.find().sort({ createdAt: -1 }); 
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE store
router.put("/store/:id", auth, async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStore);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


router.delete("/store/:id", auth, async (req, res) => {
  await Store.findByIdAndDelete(req.params.id);
  res.json({ message: "Store deleted" });
});

// GET store by ID
router.get("/store/:id", auth, async (req, res) => {
    console.log(req.params);
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
