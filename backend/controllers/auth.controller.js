const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      dob,
      email,
      password: hashedPassword
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // Send response
    res.status(201).json({
      token,
      user: {
        name: user.name,
        dob: user.dob,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      token,
      user: {
        name: user.name,
        dob: user.dob,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
