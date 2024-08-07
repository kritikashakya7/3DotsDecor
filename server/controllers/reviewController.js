import Product from "../models/Products.js";
import Review from "../models/Review.js";
import User from "../models/Users.js";

export const getReviewsByProductId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Invalid request." });

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ message: "Product not found." });

    const reviews = await Review.find({ product: id }).populate("user");

    return res.status(200).json(reviews);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, message, stars } = req.body;

    if (!id || !productId || !message || !stars)
      return res.status(400).json({ message: "Invalid request." });

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ message: "Product not found." });

    if (stars > 5 || stars < 1)
      return res.status(400).json({ message: "Invalid number of starts." });

    const review = new Review({
      user: id,
      message,
      stars,
      product: productId,
    });

    await review.save();

    return res.status(201).json({ message: "Review added successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};
