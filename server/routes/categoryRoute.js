import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategory);
router.post("/add-category", addCategory);
router.put("/:id", editCategory);
router.delete("/:id", deleteCategory);

export default router;
