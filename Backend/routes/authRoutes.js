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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User Registered" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// ================= LOGIN =================
const loginUser = async (email, password, navigate) => {
  try {
    const { data } = await axios.post("/api/login", {
      email,
      password,
    });

    // ✅ Store token
    localStorage.setItem("token", data.token);

    // ✅ Store user
    setUser(data.user);

    // ✅ Redirect
    navigate("/dashboard"); // or "/"
    
  } catch (error) {
    console.log(error.response?.data);
  }
};

// ================= GET CURRENT USER (PROTECTED) =================
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, "examSecret");

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;