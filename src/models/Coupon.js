import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      unique: [true, "Coupon code must be unique"],
      required: [true, "Coupon code required"],
    },
    discount: {
      type: Number,
      min: 0,
      required: [true, "Coupon discount required"],
    },
    expires: {
      type: Date,
      required: [true, "Coupon expiration date required"],
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
