import express from "express";
import {
  addReview,
  getReviewsByProductId,
} from "../controllers/reviewController.js";

const router = express.Router();
router.get("/:id", getReviewsByProductId);
router.post("/:id", addReview);

export default router;
