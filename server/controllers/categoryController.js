import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({ category });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required." });
    }

    const newCategory = new Category({
      name,
      description,
    });

    await newCategory.save();

    return res.status(201).json({ message: "Category added successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Invalid request." });

    const categoryToDelete = await Category.findByIdAndDelete(id);

    if (!categoryToDelete) return res.error({ message: "Category not found." });

    return res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.json({ message: "Category updated successfully" });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};
