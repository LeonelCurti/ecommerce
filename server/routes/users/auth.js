const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");

//@route   GET api/users/auth
//@desc    authorize and bring user data
//@access  Private

router.get("/auth", auth, (req, res) => {
  res.json({    
    isAdmin: req.user.isAdmin,    
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,    
    cart: req.user.cart,
    history: req.user.history
  });
});

module.exports = router;