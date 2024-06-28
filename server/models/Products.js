// models/User.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Product title is required."],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required."],
    trim: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required."],
  },
  images: {
    type: [
      {
        type: String,
      },
    ],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required."],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
