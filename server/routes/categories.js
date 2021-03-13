const express = require('express');
const router = express.Router();
const { Category } = require("../models/category");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

//@route   POST api/product/categories
//@desc    add category
//@access  Private, Admin
router.post("/", auth, admin, (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc
    });
  });
});

//@route   GET api/product/categories
//@desc    get categories
//@access  Public
router.get("/", (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(categories);
  });
});





module.exports = router