const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER HIT");

    const { name, email, password } = req.body;

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id },
      "examSecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "User Registered",
      token,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// ================= LOGIN (🔥 THIS WAS MISSING) =================
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT");

    const { email, password } = req.body;

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id },
      "examSecret",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


// ================= GET CURRENT USER =================
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), "examSecret");

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;