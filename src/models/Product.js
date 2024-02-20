import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Product title is unique"],
      required: [true, "Product title is required"],
      trim: true,
      minLength: [2, "Too short Product title"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater than 1"],
      max: [5, "rating average must be less than 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: [true, "Product description required"],
      minLength: [5, "Too short product description"],
      maxLength: [300, "Too long product description"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: {
      type: String,
    },
    images: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category required"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "Product subCategory required"],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Product Brand required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name -_id",
  });
  next();
});
productSchema.post("init", function (doc) {
  doc.imgCover = "http://localhost:5000/product/" + doc.imgCover;
  doc.images = doc.images.map((i) => {
    "http://localhost:5000/product/" + i;
  });
});

const Product = mongoose.model("Product", productSchema);

export default Product;
