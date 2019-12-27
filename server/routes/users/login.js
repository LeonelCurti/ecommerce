const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const { User } = require("../../models/user");
const dotenv = require("dotenv");
dotenv.config();

//@route   POST api/users/login
//@desc    login user
//@access  Public

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //check  for errors
    if (!errors.isEmpty()) {
      return res.json({
        loginSuccess: false, message: "Invalid credentials"
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //see if user exist

      if (!user) {
        return res.json({
          loginSuccess: false, message: "Invalid credentials"
        });
      }
      
      //compare password

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          loginSuccess: false, message: "Invalid credentials"
        });
      }
      
      //generate token

      const token = jwt.sign(
        user._id.toHexString(),
        process.env.SECRET
        );
      
      //save user with new token
      user.token = token
      await user.save()

      res.cookie("w_auth", token).json({ loginSuccess: true });

    } catch(err) {
      console.log(err);
      
      res.json({
        loginSuccess: false,
        message: "Login failed"
      });
    }   
  }
);

module.exports = router;