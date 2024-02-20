import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Category name must be unique"],
      required: [true, "Category name required"],
      minLength: [3, "Too short category name"],
      maxLength: [32, "Too long category name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    image: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

categorySchema.post("init", function (doc) {
  doc.image = "http://localhost5000/category/" + doc.image;
})
const Category = mongoose.model("Category", categorySchema);

export default Category;
