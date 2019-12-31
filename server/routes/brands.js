const express = require('express');
const router = express.Router();
const { Brand } = require("../models/brand");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

//@route   GET api/product/brands
//@desc    get brands
//@access  Public
router.get("/", (req, res) => {
  
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});


//@route   POST api/product/brands
//@desc    add brand
//@access  Private
router.post("/", auth, admin, (req, res) => {  
  const brand = new Brand(req.body);

  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.json({
      success: true,
      brand: doc
    });
  });
});

module.exports = router