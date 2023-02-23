const User = require("../models/User.model");
const bcrypt = require("bcrypt");

// REGISTER CONTROLLER
const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      pictureURL,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(password, salt);

    const userData = new User({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
      pictureURL,
      friends,
      location,
      occupation,
      viewProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUserData = await userData.save();

    res.status(201).json(savedUserData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// REGISTER CONTROLLER

// LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ error: "User does not exists" });

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res.status(400).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN CONTROLLER

module.exports = { register, login };
