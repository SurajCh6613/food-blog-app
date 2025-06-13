const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Register functionality
const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required." });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "User Already Registered." });
  }

  //   Hashing Password
  const hashedPassword = await bcrypt.hash(password, 10);
  //   Creating new user with hashed password
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //   Creating token
  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.status(200).json({ token, newUser });
};

// User Login functionality
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required." });
  }
  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
};

// Get user functionality
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ email: user.email, name: user.name});
};

module.exports = { userRegister, userLogin, getUser };
