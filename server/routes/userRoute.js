import express from "express";
import { deleteUser, getAllUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.delete("/:id", deleteUser);

export default router;
