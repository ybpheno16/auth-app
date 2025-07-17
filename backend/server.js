const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Root health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
