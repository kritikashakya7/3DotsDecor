import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
    trim: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
