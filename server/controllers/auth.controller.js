import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
