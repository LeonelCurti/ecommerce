const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SALT_I = 10;

dotenv.config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
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

//antes de hacer algo, en este caso save, ejecuta este callback
userSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
