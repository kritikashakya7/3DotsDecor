// models/User.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Review is required."],
      trim: true,
    },
    stars: {
      type: Number,
      required: [true, "No. of stars is required."],
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
