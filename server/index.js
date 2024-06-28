import express from "express";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
