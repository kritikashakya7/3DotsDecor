import express from "express";
import {
  createOrder,
  getAllOrders,
  getRecentCompletedOrders,
  paymentCallback,
} from "../controllers/OrderController.js";
import Order from "../models/Orders.js";

const router = express.Router();

router.get("/", getAllOrders);
router.get("/recent", getRecentCompletedOrders);
router.post("/create", createOrder);
router.get("/payment/callback", paymentCallback);

router.delete("/deleteall", async (req, res) => {
  try {
    await Order.deleteMany();
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
});
export default router;
