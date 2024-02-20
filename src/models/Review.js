import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Review comment required"],
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ratings: {
      type: Number,
      min: [1, "Min ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: [true, "review ratings required"],
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
