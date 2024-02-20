import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is unique"],
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Too short subCategory name"],
      maxLength: [32, "Too long SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
