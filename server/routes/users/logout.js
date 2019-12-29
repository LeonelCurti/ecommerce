const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/auth");

//@route   GET api/users/logout
//@desc    logout user
//@access  Private

router.get("/logout", auth, (req, res) => {
  return res.clearCookie('w_auth').json({ success: true }); 
});

module.exports = router;