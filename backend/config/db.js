const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
  
    });
    console.log(" MongoDB connection SUCCESS");
  } catch (error) {
    console.error("❌ MongoDB connection FAIL:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
