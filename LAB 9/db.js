// Name: Utkarsh Raj
// Roll No: 2330416

// Database connection — connects to MongoDB using Mongoose

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit if we can't connect to the database
  }
};

module.exports = connectDB;
