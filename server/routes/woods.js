const express = require('express');
const router = express.Router();
const { Wood } = require("../models/wood");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

//@route   POST api/product/woods
//@desc    add wood
//@access  Private
router.post("/", auth, admin, (req, res) => {
  const wood = new Wood(req.body);

  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      wood: doc
    });
  });
});

//@route   GET api/product/woods
//@desc    get woods
//@access  Public
router.get("/", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});





module.exports = router