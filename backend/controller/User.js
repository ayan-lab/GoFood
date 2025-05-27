import { body, validationResult } from "express-validator"; // Correct ES6 import syntax
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const validateUser = [
  body("email", "Invalid email !!").isEmail(),
  body("name", "Name should be minimum 5 characters").isLength({ min: 5 }),
  body("password", "Password should be minimum 8 characters").isLength({
    min: 8,
  }),
];

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //bcrypt hashing algorithm
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      location: req.body.location,
    });
    console.log("Creating user with data:", req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      user: savedUser,
    });
  } catch (error) {
    console.error("Error occurred while saving user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login user backend
const secretKey = "fLlXjoG59lRSSouiVZU+BaNUXqoeXx2Wi2NVDl+4o5I=";

export const loginUser = async (req, res) => {
  try {
    const useremail = await User.findOne({ email: req.body.email });
    
    if (!useremail) {
      return res.status(400).json({ message: "User not found!" });
    }

    const comparePsw = await bcrypt.compare(req.body.password, useremail.password);
    if (!comparePsw) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const data = {
      user: {
        id: useremail._id,
      },
    };

    const authToken = jwt.sign(data, secretKey);

    return res.json({ success: true, authToken });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
