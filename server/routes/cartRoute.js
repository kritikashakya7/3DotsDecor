import express from "express";
import {
  addToCart,
  getAllCartItems,
  removeCartItem,
  updateProductCount,
} from "../controllers/cartController.js";

const router = express.Router();
router.post("/add/:id", addToCart);
router.get("/:id", getAllCartItems);
router.put("/update-quantity/:id/:productId/:quantity", updateProductCount);
router.delete("/delete-item/:id/:productId", removeCartItem);

export default router;
