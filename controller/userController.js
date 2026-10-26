import { User } from "../models/usersModel.js";

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
