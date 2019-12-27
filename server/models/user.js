const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});


//function used by auth middleware
userSchema.statics.findByToken = function(token, callback){
  var user = this;

  jwt.verify(token, process.env.SECRET, function(err, decode){
    user.findOne({"_id":decode,"token":token}, function(err, user){
      if(err) return callback(err)
      callback(null, user)
    })
  });
}

const User = mongoose.model("User", userSchema);

module.exports = { User };
