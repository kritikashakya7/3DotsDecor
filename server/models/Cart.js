import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less than 1."],
        },
        itemTotal: {
          type: Number,
          required: true,
          min: [1, "Product total can not be less than 1."],
        },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
      min: [0, "Order total can not be less than 0."],
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
