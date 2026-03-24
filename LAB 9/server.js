// Name: Utkarsh Raj
// Roll No: 2330416

// Main server file — sets up Express, connects to MongoDB, and mounts routes

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors()); // Allow cross-origin requests from the frontend
app.use(express.json()); // Parse incoming JSON request bodies

// ===== Connect to MongoDB =====
connectDB();

// ===== Routes =====
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
