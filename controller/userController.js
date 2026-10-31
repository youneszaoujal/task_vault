import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Kunde inte hämta användare",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Vänligen fyll i alla fält" });
    }
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      message: "Användaren har skapats framgångsrikt!",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "  Användaren eller e-post är redan upptagen" });
    }
    res
      .status(500)
      .json({ mesage: "kunde inte registrera avvändare", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vänligen fyll i bode e-post och password " });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .staus(400)
        .json({ message: "Felaktig e-post eller löseenord" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .staus(400)
        .json({ message: "Felaktig e-post eller löseenord" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "en_tillfallig hamlig nyckel",
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Inloggningen lyckades!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "kunde inte logga in", error: err.message });
  }
};
