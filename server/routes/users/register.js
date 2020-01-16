const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const { User } = require("../../models/user");
const SALT_I = 10;

//@route   POST api/users/register
//@desc    Register new user
//@access  Public

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must must be 5 or more characters").isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //check  for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, err:'Please check your information and try again' });
    }
    const { name, lastname, email, password } = req.body;
    try {
      
      let user = await User.findOne({ email });

      //see if user exist
      if (user) {
        return res.status(400).json({ success: false, err: 'Email already exist' });
      }

      //create new user
      user = new User({name, lastname, email, password});

      //encrypt password
      const salt = await bcrypt.genSalt(SALT_I);
      user.password = await bcrypt.hash(password, salt)

      //save user
      await user.save()

      return res.json({ success: true });

    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, err: 'Server error, please try again' });
    }   
  }
);

module.exports = router;
