const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
      isAdmin: req.body.isAdmin || false  // admin can only be set manually if desired
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered", userId: savedUser._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong email or password");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).json("Wrong email or password");

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
