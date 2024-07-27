import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import User from "../models/Users.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { id } = req.params; // Customer ID

    const { products } = req.body; // Products

    let newOrderItems = [];
    let newOrderTotal = 0;

    // Calculate product totals for new products and new order total
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found.` });
      }
      newOrderItems.push(item);
      newOrderTotal += item.itemTotal;
    }

    // Find the cart of the given customer
    let cart = await Cart.findOne({ customer: mongoose.Types.ObjectId(id) });

    if (cart) {
      // Updating cart if it exists
      for (const newItem of newOrderItems) {
        const existingProduct = cart.orderItems.find(
          (item) => item.product.toString() === newItem.product
        );

        if (existingProduct) {
          // Update the quantity and product total of the existing product
          existingProduct.quantity += newItem.quantity;
          existingProduct.itemTotal += newItem.itemTotal;
        } else {
          // Add the new product to the cart

          cart.orderItems.push(newItem);
        }

        // Update the order total

        cart.orderTotal += newOrderTotal;

        await cart.save();

        return res
          .status(200)
          .json({ message: "Added to cart successfully.", cart });
      }
    } else {
      // Creating new cart if it doesn't exist
      const newCart = new Cart({
        customer: mongoose.Types.ObjectId(id),
        orderItems: newOrderItems,
        orderTotal: newOrderTotal,
      });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Added to cart successfully.", newCart });
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const updateProductCount = async (req, res) => {
  try {
    const { id, productId, quantity } = req.params;

    if (!id || !productId || !quantity)
      return res.status(400).json({ message: "Invalid request." });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID format." });
    }

    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "User not found." });
    }

    const cartToUpdate = await Cart.findOne({
      customer: mongoose.Types.ObjectId(id),
    })
      .populate("customer")
      .populate({
        path: "orderItems.product",
      });

    if (!cartToUpdate) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const newQuantity = parseInt(quantity, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer." });
    }

    // Find the product in the cart
    const productItem = cartToUpdate.orderItems.find(
      (item) => item.product._id.toString() === productId
    );

    if (!productItem) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Update the quantity and item total
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    productItem.quantity = newQuantity;
    productItem.itemTotal = product.price * newQuantity;

    cartToUpdate.orderTotal = cartToUpdate.orderItems.reduce(
      (total, item) => total + item.itemTotal,
      0
    );

    await cartToUpdate.save();

    return res.status(200).json({
      message: "Product quantity updated successfully.",
      cart: cartToUpdate,
    });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID format." });
    }

    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "User not found." });
    }

    const cart = await Cart.findOne({
      customer: mongoose.Types.ObjectId(id),
    })
      .populate("customer")
      .populate({
        path: "orderItems.product",
      });

    return res.status(200).json({ cart });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return {
      success: false,
      message: "Internal server error. Try again later.",
    };
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id, productId } = req.params;

    const customer = await User.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "User not found." });
    }

    const cartToUpdate = await Cart.findOne({ customer: id })
      .populate("customer")
      .populate({ path: "orderItems.product" });

    if (!cartToUpdate) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Find out index of the product to remove
    const productIndex = cartToUpdate.orderItems.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart." });
    }

    // Remove the product from the cart
    const removedProduct = cartToUpdate.orderItems.splice(productIndex, 1)[0];

    // Update the order total
    cartToUpdate.orderTotal -= removedProduct.itemTotal;

    await cartToUpdate.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully." });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Try again later." });
  }
};
