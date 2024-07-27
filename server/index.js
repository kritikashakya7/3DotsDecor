import express from "express";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import cors from "cors";
import { connectDb } from "./dbconfig.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = 4000;

connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

app.use(express.json({ limit: "500mb" }));
app.use(
  cors({
    origin: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/admin", adminRoute);
app.use("/api/customer", userRoute);
app.use("/api/cart", cartRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
