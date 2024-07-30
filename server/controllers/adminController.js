import Category from "../models/Category.js";
import Order from "../models/Orders.js";
import Product from "../models/Products.js";
import User from "../models/Users.js";

export const getDashboardCounts = async (req, res) => {
  try {
    const category = await Category.find();
    const product = await Product.find();
    const customer = await User.find({ role: "customer" });
    const order = await Order.find({ status: "Completed" });
    const categoryCount = category.length;
    const productCount = product.length;
    const customerCount = customer.length;
    const orderCount = order.length;

    return res
      .status(200)
      .json({ categoryCount, productCount, customerCount, orderCount });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};
