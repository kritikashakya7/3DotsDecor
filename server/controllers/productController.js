import Product from "../models/Products.js";
import Category from "../models/Category.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
export const addProduct = async (req, res) => {
  try {
    const { title, price, category, description, thumbnail, stock } = req.body;

    if (!title || !price || !category || !description || !thumbnail || !stock)
      return res
        .status(400)
        .json({ message: "Invalid request. All fields are required." });

    let thumbnailUrl;

    if (thumbnail) {
      const uploadThumbnailResponse = await cloudinary.uploader.upload(
        thumbnail
      );
      thumbnailUrl = uploadThumbnailResponse.secure_url;
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid Category ID." });
    }

    const categoryCheck = await Category.findById(category);

    if (!categoryCheck)
      return res.status(404).json({ message: "Category not found." });

    const newProduct = new Product({
      title,
      price,
      categoryId: category,
      description,
      thumbnail: thumbnailUrl,
      stock,
    });

    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error. Try again later.");
  }
};

export const editProduct = async (req, res) => {
  try {
    const { title, price, category, description, thumbnail, stock } = req.body;
    const { id } = req.params;

    let thumbnailUrl;

    if (thumbnail && !thumbnail.startsWith("http")) {
      const uploadThumbnailResponse = await cloudinary.uploader.upload(
        thumbnail
      );
      thumbnailUrl = uploadThumbnailResponse.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        categoryId: category,
        stock,
        ...(thumbnailUrl && { thumbnail: thumbnailUrl }),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Invalid request." });

    const productToDelete = await Product.findByIdAndDelete(id);

    if (!productToDelete) return res.error({ message: "Product not found." });

    const thumbnail = productToDelete?.thumbnail;
    const images = productToDelete?.images;

    await cloudinary.uploader.destroy(thumbnail.split("/").pop().split(".")[0]);

    images.map(async (img) => {
      await cloudinary.uploader.destroy(img.split("/").pop().split(".")[0]);
    });

    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({ products });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.error({ message: "Invalid request." });

    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: "Post not found." });

    return res.status(200).json({ product });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    // Case-insensitive search for products
    const products = await Product.find({
      title: { $regex: query, $options: "i" },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json("Internal server error. Try again later.");
  }
};
