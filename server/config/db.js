const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.mongoURI
        : process.env.mongoURI2,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed.", err);
    process.exit();
  }
};

module.exports = connectDB;
