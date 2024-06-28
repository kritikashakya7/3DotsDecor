import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already in use." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json("Account Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });
    if (!password)
      return res.status(400).json({ message: "Password is required." });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        id: existingUser._id,
        name: `${existingUser.firstName} ${existingUser.lastName}`,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully.", token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
