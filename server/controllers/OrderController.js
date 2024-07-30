import Order from "../models/Orders.js";
import User from "../models/Users.js";
import Product from "../models/Products.js";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const getRecentCompletedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Completed" })
      .limit(5)
      .populate("customer")
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ createdAt: -1 });

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

    if (!customerId || !products || products.length < 1)
      return res.status(400).json({ message: "Invalid request." });

    const customer = await User.findById(customerId);

    let orderTotal = 0;
    let productDetails = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found.` });
      }

      if (product.stock < item.quantity)
        return res.status(400).json({ message: "Product is out of stock." });

      orderTotal += item.itemTotal;

      productDetails.push({
        identity: item.productId,
        name: item.title,
        total_price: item.itemTotal,
        quantity: item.quantity,
        unit_price: item.price,
      });
    }

    const newOrder = await new Order({
      customer: customerId,
      products: products,
      orderTotal,
    }).populate({
      path: "products.productId",
    });

    newOrder.save();

    const orderId = newOrder._id.toString();

    var options = {
      method: "POST",
      url: `${process.env.KHALTI_URL}/epayment/initiate/`,
      headers: {
        Authorization: process.env.KHALTI_SECRECT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: `${process.env.SERVER_BASE_URL}/order/payment/callback`,
        website_url: `${process.env.CLIENT_BASE_URL}`,
        amount: newOrder.orderTotal * 1,
        purchase_order_id: orderId,
        purchase_order_name: orderId,
        customer_info: {
          name: customer.firstName + " " + customer.lastName,
          email: customer.email,
        },
        product_details: productDetails,
      }),
    };

    request(options, function (error, response) {
      const data = JSON.parse(response?.body);

      if (data.error_key)
        return res.status(400).json({
          message:
            "Your request couldn't be completed at the moment. Please try again later.",
        });

      if (error) throw new Error(error);

      return res.status(200).json({
        message: "Order created successfully",
        order: newOrder,
        paymentUrl: data.payment_url,
      });
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const paymentCallback = async (req, res) => {
  try {
    const { pidx, status, purchase_order_id } = req.query;

    if (status === "User canceled") {
      await Order.findOneAndUpdate(
        { _id: purchase_order_id },
        { status: "Cancelled" }
      );
      return res.redirect(`${process.env.CLIENT_BASE_URL}/payment-fail`);
    }

    var options = {
      method: "POST",
      url: `${process.env.KHALTI_URL}/epayment/lookup/`,
      headers: {
        Authorization: process.env.KHALTI_SECRECT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pidx: pidx,
      }),
    };

    request(options, async function (error, response) {
      const data = JSON.parse(response?.body);

      if (data.error_key)
        return res.redirect(`${process.env.CLIENT_BASE_URL}/payment-fail`);

      if (error) throw new Error(error);

      if (data.status === "Completed") {
        const order = await Order.findOneAndUpdate(
          { _id: purchase_order_id },
          { status: "Completed" },
          { new: true }
        );

        order.products.map(async (product) => {
          const currentProduct = await Product.findById(product.productId);

          const newStock = currentProduct.stock - product.quantity;

          currentProduct.stock = newStock;

          await currentProduct.save();
        });

        return res.redirect(`${process.env.CLIENT_BASE_URL}/payment-success`);
      }
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res.redirect(`${process.env.CLIENT_BASE_URL}/payment-fail`);
  }
};
