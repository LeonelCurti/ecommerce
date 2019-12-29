const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let auth = async (req, res, next) => {

  //get token from client cookie
  let token = req.cookies.w_auth; 

  //check if no token
  if (!token) {
    return res.json({
      isAuth: false,
      error: true
    })    
  }

  try{  
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //find decoded id in DB
    let user = await User.findOne({"_id": decoded._id});

    if(!user) {
      throw new Error('no user found');
    }
    //if everything ok, pass user to next logic
    
    req.user = user;
    next();

  }catch(err){
    console.log(err);
    return res.json({
      isAuth: false,
      error: true
    })
  }  

};

module.exports = { auth };
