const { User } = require("../models/user");

let admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.send("You are not allowed");
  }  
  next();
};

module.exports = { admin };
