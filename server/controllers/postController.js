import Product from "../models/Products";
import { v2 as cloudinary } from "cloudinary";

export const addProduct = async (req, res) => {
  try {
    const { title, price, description, thumbnail, images, stock } = req.body;

    let thumbnailUrl;
    const imageUrl = [];

    if (thumbnail) {
      const uploadThumbnailResponse = await cloudinary.uploader.upload(
        thumbnail
      );
      thumbnailUrl = uploadThumbnailResponse.secure_url;
    }

    if (images) {
      const uploadPromises = images.map(async (image) => {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl.push(uploadResponse.secure_url);
      });

      await Promise.all(uploadPromises);
    }

    const newProduct = new Product({
      title,
      price,
      description,
      thumbnail: thumbnailUrl,
      images: imageUrl,
      stock,
    });

    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
