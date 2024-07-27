import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  searchProduct,
} from "../controllers/productController.js";

const router = express.Router();
router.post("/add-product", addProduct);

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/search", searchProduct);

router.put("/:id", editProduct);

router.delete("/delete-product/:id", deleteProduct);

export default router;
