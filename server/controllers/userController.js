import User from "../models/Users.js";
import mongoose from "mongoose";

export const getAllUser = async (req, res) => {
  try {
    const customers = await User.find().select("-password");

    return res.status(200).json({ customers });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json({ message: "Invalid request. User ID to delete is required." });

    const userToDelete = await User.findByIdAndDelete(id);

    if (!userToDelete)
      return res.status(404).json({ message: "User not found." });

    return res.status(201).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};
