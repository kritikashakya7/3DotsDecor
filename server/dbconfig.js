import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDb = async () => {
  try {
    // mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Connected to Datbase Successfully.");
  } catch (error) {
    console.error(`Error Connecting to Database: ${error.message}`);
    process.exit(1);
  }
};
