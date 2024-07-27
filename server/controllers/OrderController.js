import Order from "../models/Orders";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;
    console.log("🚀 ~ products:", products);

    if (!customerId || !products || products.length < 1)
      return res.status(400).json({ message: "Invalid request." });

    // const newOrder = new Order({
    //     customer: customerId,
    //     products: products,
    // })
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};
