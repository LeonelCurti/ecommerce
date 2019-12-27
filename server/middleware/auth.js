const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let auth = async (req, res, next) => {

  //get token from client cookie
  let token = req.cookies.w_auth;
  
  console.log('token recibido: ',token);
  if (!token) {
    return res.json({
      isAuth: false,
      error: true
    })    
  }

  try{  
    
    const decoded = jwt.verify(token, process.env.SECRET)

    let user = await User.findOne({"_id":decoded,"token":token});

    if(!user) {
      throw new Error('no user found');
    }

    req.token = token;
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
