import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is unique"],
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Too short Brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

brandSchema.post("init", function (doc) {
  doc.logo = "http://localhost:5000/brand/" + doc.logo;
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
